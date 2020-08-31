import { observable, computed, action, reaction, configure, runInAction } from 'mobx';
import decode from 'jwt-decode';
import { toJS } from 'mobx';
import { Api } from '../Constants/api';

configure({enforceActions : 'observed'})

class AlbumStore {

	@observable id = '';
	@observable loading = false;
	@observable data = [];
	@observable singleData = {};

	
	@observable offset = 0;
	@observable limit = 5;
	@observable type = ''; // album, EP, Single, Autres
	@observable genre = '';
	@observable pays = '';
	@observable artiste = '';
	@observable by = 'titre_sortie'; // 'titre_sortie', 'date_sortie_original', 'date_sortie_digitale', 'date_crea'
	@observable direction = 'ASC';

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
		
		Api.get('/albums/detail/'+this.id).then(({data}) => {
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

	@action
	getAll = (datas, callback) => {

		this.loading = true;	

		Api.get('/albums/', {
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
		if(data.type) this.type = data.type;
		if(data.genre) this.genre = data.genre;
		if(data.artiste) this.artiste = data.artiste
		if(data.pays) this.pays = data.pays

		let values = {
	      limit: this.limit,
	      offset: this.offset, 
	      by: this.by, 
	      direction: this.direction
		}
		
		if(this.type && data.type) values["type"] = this.type;

		if(this.genre && data.genre) values["genre"] = this.genre;

		if(this.artiste && data.artiste) values["artiste"] = this.artiste;

		if(this.pays && data.pays) values['pays'] = this.pays;	

	    this.getAll(values, (errors) => {

	      if (typeof errors === 'object' && errors.status === 200) {
			  callback([...errors.data]);
	      }else{
			  callback(false);
		  }    

	    })

	}


}

let albumStore = new AlbumStore();

export { albumStore };