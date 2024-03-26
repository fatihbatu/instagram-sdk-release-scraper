import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Version } from 'src/schemas/Version.schema';
import { Model } from 'mongoose';
import { Variant } from 'src/schemas/Variant.schema';
import * as cheerio from 'cheerio';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Version.name) private versionModel: Model<Version>,
    @InjectModel(Variant.name) private variantModel: Model<Variant>,
    private readonly httpService: HttpService,
  ) {}

  async seedDatabase(): Promise<any[]> {
    await this.versionModel.deleteMany({});
    await this.variantModel.deleteMany({});

    const releaseNames = await this.scrapeVersions();

    for (const release of releaseNames) {
      const newVersion = new this.versionModel({
        ...release,
      });
      await newVersion.save();

      const variants = await this.scrapeVariants(release.href);
      for (const variant of variants) {
        const newVariant = new this.variantModel({
          ...variant,
          version: newVersion._id,
        });
        await newVariant.save();
      }
    }

    return releaseNames;
  }

  async getHTML(url: string): Promise<any> {
    try {
      const response = await this.httpService.get(url).toPromise();
      return response;
    } catch (error) {
      console.error('Error fetching HTML:', error);
      throw error;
    }
  }

  async scrapeVersions(maxRetries = 3, delay = 5000): Promise<any[]> {
    const MAX_PAGES = 10;
    let currentPage = 1;
    const baseUrl = 'https://www.apkmirror.com/uploads/page/';
    const category = '?appcategory=instagram-instagram';
    const releaseNames = [];

    while (releaseNames.length < 10 && currentPage <= MAX_PAGES) {
      const url = baseUrl + currentPage + category;
      let response;
      let retries = 0;

      do {
        try {
          response = await this.getHTML(url);
          break;
        } catch (error) {
          if (error.response && error.response.status === 429) {
            console.log(
              'Rate limit encountered retrying in' + delay / 1000 + 'seconds',
            );
            retries++;
            if (retries >= maxRetries) {
              console.log('Max retries reached, stopping scrape for this page');
              break;
            }
            await new Promise((resolve) => setTimeout(resolve, delay));
            delay *= 2;
          } else {
            throw error;
          }
        }
      } while (true);

      if (!response || !response.data) {
        console.error('Failed to fetch HTML');
        break;
      }

      const $ = cheerio.load(response.data);
      const scrapedElements = $(
        '#primary > div.widget.widget_appmanager_recentpostswidget > div > div > div.appRow > div',
      );

      if (scrapedElements.length === 0) {
        console.warn('No elements found on this page, stopping scrape');
        break;
      }

      scrapedElements.each((_, element) => {
        const versionId = $(element)
          .find('div:nth-child(2) > div >h5 > a')
          .text()
          .trim();
        const href = $(element)
          .find('div:nth-child(2) > div >h5 > a')
          .attr('href');
        const releaseDate = $(element)
          .find('div.table-cell.hidden-xs > span > span')
          .attr('data-utcdate');
        const variantCount = $(element)
          .find('div:nth-child(2) > div > div > a')
          .text()
          .trim()
          .split(' ')[0];

        const isAlpha = versionId.includes('alpha');
        const isBeta = versionId.includes('beta');

        if (!isAlpha && !isBeta) {
          releaseNames.push({
            versionId,
            href,
            releaseDate,
            variantCount: parseInt(variantCount),
          });
        }
      });

      currentPage++;
    }

    return releaseNames.slice(0, 10);
  }

  async scrapeVariants(
    extensionURL: string,
    maxRetries = 3,
    delay = 5000,
  ): Promise<any[]> {
    let retries = 0;

    do {
      try {
        const releaseDetails = [];
        const url = `https://www.apkmirror.com/${extensionURL}`;

        const response = await this.getHTML(url);
        const html = response.data;
        if (!html || !html.length) {
          console.error('Failed to fetch HTML');
          break;
        }

        const $ = cheerio.load(html);
        const versionRows = $('.variants-table .table-row.headerFont').slice(1);

        versionRows.each((_, row) => {
          const variantId = $(row)
            .find(
              '.table-cell.rowheight.addseparator.expand.pad.dowrap a.accent_color',
            )
            .text()
            .trim();
          const arc = $(row)
            .find(
              '.table-cell.rowheight.addseparator.expand.pad.dowrap:nth-child(2)',
            )
            .text()
            .trim();
          const minSdk = $(row)
            .find(
              '.table-cell.rowheight.addseparator.expand.pad.dowrap:nth-child(3)',
            )
            .text()
            .trim();
          const dpi = $(row)
            .find(
              '.table-cell.rowheight.addseparator.expand.pad.dowrap:nth-child(4)',
            )
            .text()
            .trim();

          releaseDetails.push({
            variantId,
            arc,
            minSdk,
            dpi,
          });
        });

        return releaseDetails;
      } catch (error) {
        console.error('Error scraping release details:', error);
        if (error.response && error.response.status === 429) {
          console.log(
            'Rate limit encountered, retrying in',
            delay / 1000,
            'seconds',
          );
          retries++;
          if (retries >= maxRetries) {
            console.warn('Max retries reached, stopping scrape for this URL');
            break;
          }
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2;
        } else {
          throw error;
        }
      }
    } while (true);

    return null;
  }
}
