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

import { ToonilyParser } from './ToonilyParser'

const DOMAIN = 'https://toonily.com'

export const ToonilyInfo: SourceInfo = {
    version: getExportVersion('0.0.2'),
    name: 'Toonily',
    description: `Extension that pulls manga from ${DOMAIN}`,
    author: 'Netsky',
    authorWebsite: 'http://github.com/TheNetsky',
    icon: 'icon.png',
    contentRating: ContentRating.ADULT,
    websiteBaseURL: DOMAIN,
    sourceTags: [
        {
            text: 'Notifications',
            type: TagType.GREEN
        },
        {
            text: '18+',
            type: TagType.YELLOW
        },
        {
            text: 'Cloudflare',
            type: TagType.RED
        }
    ]
}

export class Toonily extends Madara {

    baseUrl: string = DOMAIN

    languageCode: LanguageCode = LanguageCode.ENGLISH

    override hasAdvancedSearchPage = true

    override sourceTraversalPathName = 'webtoon'
    
    override alternativeChapterAjaxEndpoint = true

    override searchMangaSelector = 'div.page-item-detail.manga'

    override readonly parser: ToonilyParser = new ToonilyParser();

}
