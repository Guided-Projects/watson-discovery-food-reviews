/**
 * Copyright 2017 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License'); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

const util = require('util');

module.exports = {
  setEnvironmentId(environmentId) {
    this.environmentId = environmentId;
  },
  setCollectionId(collectionId) {
    this.collectionId = collectionId;
  },
  search(queryOpts) {
    const params = Object.assign({
      environmentId: this.environmentId,
      collectionId: this.collectionId,
      highlight: true,
      aggregation:
        '[term(enriched_text.entities.text).term(enriched_text.sentiment.document.label),' +
        'term(enriched_text.categories.label).term(enriched_text.sentiment.document.label),' +
        'term(enriched_text.concepts.text).term(enriched_text.sentiment.document.label),' +
        'term(enriched_text.keywords.text).term(enriched_text.sentiment.document.label),' +
        'term(enriched_text.entities.type).term(enriched_text.sentiment.document.label),' +
        'term(UserId,count:100),' +
        'nested(enriched_text.entities).filter(enriched_text.entities.type:Product).term(enriched_text.entities.text)]'
    }, queryOpts);

    console.log('Discovery Search Query Params: ');
    console.log(util.inspect(params, false, null));
    return params;
  }
};
