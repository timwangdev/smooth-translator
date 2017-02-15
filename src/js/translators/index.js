import BaiduTranslator from './baidu_translator';
import YoudaoTranslator from './youdao_translator';
import BingTranslator from './bing_translator';
import PearsonTranslator from './pearson_translator';

export default {
  baidu: BaiduTranslator,
  youdao: new YoudaoTranslator(),
  bing: new BingTranslator(),
  pearson: new PearsonTranslator()
};
