import Axios from 'axios';
Axios.defaults.baseURL =  'https://apidemo.iut-bm.univ-fcomte.fr/herocorp';

export default Axios;
export * from './hero.service';
export * from './team.service';
export * from './org.service';