/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    ContentRating,
    LanguageCode,
    SourceInfo,
    TagType
} from 'paperback-extensions-common'
import {
    getExportVersion,
    Madara
} from '../Madara'

const DOMAIN = 'https://manhuaus.com'

export const ManhuausInfo: SourceInfo = {
    version: getExportVersion('0.0.3'),
    name: 'Manhuaus',
    description: `Extension that pulls manga from ${DOMAIN}`,
    author: 'GameFuzzy',
    authorWebsite: 'http://github.com/gamefuzzy',
    icon: 'icon.png',
    contentRating: ContentRating.EVERYONE,
    websiteBaseURL: DOMAIN,
    sourceTags: [
        {
            text: 'Notifications',
            type: TagType.GREEN
        }
    ]
}

export class Manhuaus extends Madara {

    baseUrl: string = DOMAIN

    languageCode: LanguageCode = LanguageCode.ENGLISH

    override hasAdvancedSearchPage = true

    override chapterDetailsSelector = 'li.blocks-gallery-item > figure > img, div.page-break > img, div#chapter-video-frame > p > img, div.text-left > figure.wp-block-gallery > figure.wp-block-image > img, div.text-left > p > img'
    
    override alternativeChapterAjaxEndpoint = true

    override constructAjaxHomepageRequest(page: number, postsPerPage: number, meta_key: string, meta_value?: string): any {
        switch (meta_key) {
            case '_latest_update':
                return createRequestObject({
                    url: `${this.baseUrl}/page/${page}`,
                    method: 'GET'
                })
            case '_wp_manga_week_views_value':
                break
            case '_wp_manga_views':
                break
            case '_wp_manga_status':
            default:
                throw new Error('Invalid AJAX endpoint for homepage')
        }
        
        return createRequestObject({
            url: `${this.baseUrl}/wp-admin/admin-ajax.php`,
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                'action': 'madara_load_more',
                'template': 'madara-core/content/content-archive',
                'page': page,
                'vars[paged]': '1',
                'vars[posts_per_page]': postsPerPage,
                'vars[orderby]': 'meta_value_num',
                'vars[sidebar]': 'right',
                'vars[post_type]': 'wp-manga',
                'vars[order]': 'desc',
                'vars[meta_key]': meta_key,
                'vars[meta_value]': meta_value
            }
        })
    }
}
