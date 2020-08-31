/* eslint-disable no-unreachable */
import { observable, computed, action, reaction, configure, runInAction } from 'mobx';
import decode from 'jwt-decode';
import { toJS } from 'mobx';
import { Api } from '../Constants/api';

configure({enforceActions : 'observed'});

class AuthStore {

  @observable isAuth = false;
  @observable token = localStorage.getItem('jwt-c9424978b3606598958a');
  @observable user =  {};
  @observable permission = [];
  @observable tokenRefrech = false;

  constructor() {
      reaction(
       () => this.token,
       token => {
         if (token) {

           localStorage.setItem('jwt-c9424978b3606598958a', token);
           Api.defaults.headers.common['Authorization'] = token;
           this.isAuth = true;
           this.getUser();

         } else {

           localStorage.removeItem('jwt-c9424978b3606598958a');
           Api.defaults.headers.common['Authorization'] = '';
           this.isAuth = false;
           this.user = {};
           this.permission = [];

         }
       }
     );

     this.checkToken();
  }

  @action checkToken = () => {

    if (this.token) {

      localStorage.setItem('jwt-c9424978b3606598958a', this.token);
      Api.defaults.headers.common['Authorization'] = this.token;
      this.isAuth = true;
      this.getUser();

    } else {

      localStorage.removeItem('jwt-c9424978b3606598958a');
      Api.defaults.headers.common['Authorization'] = '';
      this.isAuth = false;
      this.user = {};
      this.permission = [];

    }

  };

  @computed get expiredToken(){

    try {

      const { exp } = decode(this.token);

      const currentTime = new Date().getTime() / 1000;
      // const newTime = new Date(currentTime - 10*60000);

      const expCurrent = exp * 1000;
      const newExpire = new Date(expCurrent - 10*6000).getTime() / 1000;

      if (newExpire < currentTime && currentTime < exp) {
          return { action: true, type: 'refresh'}
      }else if(exp < currentTime){
        return { action : true, type: 'logout' };
      }else{
        this.tokenRefrech = false;
        return { action: false, type: 'refresh'}
      }

    }catch (e){

      return { action : true, type: 'logout' };

    }

    // return { action: false, type: 'logout'};
  }

  @action refresh = () => {    
    Api.post('/refresh')
      .then(({data}) => {
        runInAction(() => {
          this.setToken(data.response.access_token);
        })
      })
  };

  @action getUser = () => {

      Api.post('/membre/me').then(({data}) => {
        runInAction(() => {
          this.user = data.data[0];
          // console.log(this.user)
          // this.permission = data.response.permission;
        })
      });

  };


  @action setToken = token => {
     this.token = token;
  };


  @action login = (email, password, callback) => {

      Api.post('/membre/login', {
        'email': email,
        'password': password
      }).then(({data}) => {

        const token = data.token;
        runInAction(() => {
          this.setToken(token);
        });
        callback(data);

      }).catch(error => {
        callback(error.response);
      });

  };

  @action register = (datas, callback) => {

    Api.post('/membre/inscrire', datas
    ).then(({data}) => {
      
      callback(data);

    }).catch(error => {
      callback(error.response);
    });
  };

  @action logout = () => {
    this.token = '';
    this.isAuth = false;
    this.user = {};
    this.permission = [];
  };

  @action isAllowed(permission, rights) {
    const permissions = toJS(permission);
    if(rights.length > 0 && permissions){
        return rights.some(right => permissions.indexOf(right) !== -1);
    }else{
        return true;
    }

  };

}

let authStore = new AuthStore();

export { authStore };
