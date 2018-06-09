// @flow
import moment from 'moment'

/**
 * moment.diff()でdiffを算出するためのフォーマッタ
 * @param {Object} momentObj momentオブジェクト
 * @param {Object} proxymo moemntオブジェクトがinvalidだった場合の代理momentオブジェクト
 */
export const momentDiffFormatter = (momentObj: any, proxymo: any) => {
  if(proxymo === undefined) proxymo = moment()
  return momentObj.isValid() ?
    momentObj.format('YYYY,MM,DD').split(',').map(date => ( parseInt(date, 10))) :
    proxymo.format('YYYY,MM,DD').split(',').map(date => ( parseInt(date, 10)))
}