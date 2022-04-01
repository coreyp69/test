/*
 *
 * Copyright 2018-present NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import {
  MosaicGlobalRestriction,
  MosaicGlobalRestrictionItem,
  MosaicId,
  MosaicRestrictionType,
  RepositoryFactoryHttp,
} from 'symbol-sdk';

/* start block 01 */
// replace with mosaic id
const mosaicIdHex = '634a8ac3fc2b65b3';
const mosaicId = new MosaicId(mosaicIdHex);
// replace with node endpoint
const nodeUrl = 'NODE_URL';
const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
const restrictionHttp = repositoryFactory.createRestrictionMosaicRepository();

const criteria = { mosaicId };
restrictionHttp.search(criteria).subscribe(
  (mosaicGlobalRestrictions) => {
    if (mosaicGlobalRestrictions.data.length > 0) {
      console.log(
        'Key\t',
        'Reference MosaicId\t',
        'Restriction Type\t',
        'Restriction Value',
      );
      mosaicGlobalRestrictions.data.forEach((mosaicRestriction) => {
        if (mosaicRestriction instanceof MosaicGlobalRestriction) {
          mosaicRestriction.restrictions.forEach(
            (value: MosaicGlobalRestrictionItem) => {
              console.log(
                '\n',
                value.key,
                value.referenceMosaicId.toHex(),
                MosaicRestrictionType[value.restrictionType],
                value.restrictionValue,
              );
            },
          );
        }
      });
    } else {
      console.log(
        '\n The mosaic does not have mosaic global restrictions assigned.',
      );
    }
  },
  (err) => console.log(err),
);
/* end block 01 */
