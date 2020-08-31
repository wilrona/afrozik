import { observable, computed, action, reaction, configure, runInAction } from 'mobx';
import decode from 'jwt-decode';
import { toJS } from 'mobx';
import { Api } from '../Constants/api';


configure({enforceActions : 'observed'})


class VideoStore {

	@observable id = '';
	@observable loading = false;
	@observable data = [];
	@observable singleData = {};

	
	@observable offset = 0;
	@observable limit = 5;	
	@observable by = 'titre'; // 'titre', 'annee_sortie', 'date_publication'
	@observable direction = 'ASC';

	@observable playlist = '';
	@observable artiste = '';

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
		
		Api.get('/video/detail/'+this.id).then(({data}) => {
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
		
		Api.get('/video/', {
			params : datas
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
		if(data.artiste) this.artiste = data.artiste
		if(data.playlist) this.playlist = data.playlist

		let values = {
	      limit: this.limit,
	      offset: this.offset, 
	      by: this.by, 
	      direction: this.direction
		}
		
		if(this.artiste && data.artiste) values["artiste"] = this.artiste;
		if(this.playlist && data.playlist) values["playlist"] = this.playlist;

	    this.getAll(values, (errors) => {

	      if (typeof errors === 'object' && errors.status === 200) {
			//   this.setData([...errors.data])
			  callback([...errors.data]);
	      }else{
			  callback(false);
		  }    

	    })

	}

}

let videoStore = new VideoStore();

export { videoStore };