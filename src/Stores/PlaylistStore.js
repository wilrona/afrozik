import { observable, computed, action, reaction, configure, runInAction } from 'mobx';
import decode from 'jwt-decode';
import { toJS } from 'mobx';
import { Api } from '../Constants/api';


configure({enforceActions : 'observed'})


class PlaylistStore {

	@observable id = '';
	@observable loading = false;
	@observable data = [];
	@observable singleData = {};

	
	@observable offset = 0;
	@observable limit = 5;
	@observable by = 'titre'; // 'titre', 'statut', 'date_update', 'type'
	@observable direction = 'ASC';

	
	@observable type = ''; // audio, video
	@observable membre = '';

	constructor() {

	    reaction(
	     () => this.id,
	     id => {
	       if (id) {
	       	  this.loading = true;
	          this.getById();
	       }else{
	         this.id = '';
	       }
	     }
	   );

    }

	@action setId(id){
    	this.id = id;
  	}

  	@action setData(data){
		this.data = data;
  	}

  	@action setOffset(){
  		this.offset = this.offset + 1;
	  }
	  
	@action initOffset(offset){
		this.offset = offset + 1;
	}

	@action getById = () => {	
		
		Api.get('/playlist/detail/'+this.id).then(({data}) => {
			runInAction(() => {
	          this.singleData = data.data
	          this.loading = false;
	        })
		}).catch(error => {
		   runInAction(() => {
	          this.loading = true;
	        })
	    });
	}

	@action getAll = (datas, callback) => {

		this.loading = true;

		Api.get('/playlist/', {
			params: datas
		}).then(({data}) => {
			runInAction(() => {
	          this.loading = false;
	        })
			callback(data);
		}).catch(error => {
		//    console.log(error);
	       callback(error.response);
	    });
	}

	@action fetch = (data, callback) => {
		
		if(data.limit) this.limit = data.limit;
		if(data.by) this.by = data.by;
		if(data.direction) this.direction = data.direction;		
		if(data.type) this.type = data.type;
		if(data.membre) this.membre = data.membre

		let values = {
	      limit: data.limit,
	      offset: this.offset, 
	      by: this.by, 
	      direction: this.direction
		}
		
		if(this.membre && data.membre)	values["membre"] = this.membre;

		if(this.type && data.type) values["type"] = this.type;

	    this.getAll(values, (errors) => {

	      if (typeof errors === 'object' && errors.status === 200) {
			  callback([...errors.data]);
	      }else{
			  callback(false);
		  }    

	    })

	}

	

}

let playlistStore = new PlaylistStore();

export { playlistStore };