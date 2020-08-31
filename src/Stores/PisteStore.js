import { observable, computed, action, reaction, configure, runInAction } from 'mobx';
import decode from 'jwt-decode';
import { toJS } from 'mobx';
import { Api } from '../Constants/api';

configure({enforceActions : 'observed'})

class PisteStore {

	@observable id = '';
	@observable loading = false;
	@observable data = [];

	@observable offset = 0;
	@observable limit = 5;
	@observable sortie = '';
	@observable playlist = '';
	@observable artiste = '';
	@observable by = 'titre'; // 'titre', 'date_publication'
	@observable direction = 'ASC';

	@observable single = '';
	@observable action = 'add';


	// element of piste

	@observable name = '';
	@observable artist = '';
	@observable album = '';
	@observable url =  '';
	@observable cover_art_url = "";
	@observable made_up_key = "I'm made up completely";


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

     reaction(
	     () => this.single,
	     single => {
	       if (typeof single === 'object') {

		       	let artiste = '';
				single.artistes.map((item, index_item) => {
						artiste +=  index_item !== 0 ? ',' : '';
						artiste +=  item.nom
					}
		          )

		       	 const song = {
		  			name: single.titre,
					artist: artiste,
					album: single.album,
					url: single.fichier,
					cover_art_url: '',
					made_up_key: ''
		  		}

		  		if(this.action === 'play'){
		  			window.Amplitude.playNow(song);	
		  		}
				


		  		if(this.action === 'add'){


					const exist_song = window.Amplitude.getPlayerState()

			  		if(exist_song === 'stopped'){

		  				window.Amplitude.playNow(song);		  		

			  		}
					
					if(exist_song === 'playing' || exist_song === 'pause'){

		  				window.Amplitude.addSong(song);	  	

			  		}

		  		}
	  		
	       }else{
	         this.single = '';
	       }
	     }
	   );

    }

	@action setId(id){
    	this.id = id;
  	}

  	@action setAction(action){
    	this.action = action;
  	}

  	@action setData(data){
  		this.data = toJS(data);
  	}

  	@action setOffset(){
  		this.offset = this.offset + 1;
	  }
	  
	@action initOffset(offset){
		this.offset = offset + 1;
	}

  	@action setSingleData(data){
  		this.single = data
  	}

	@action getById = () => {
		
		Api.get('/piste/detail/'+this.id).then(({data}) => {
			runInAction(() => {
				this.setSingleData(data.data)
	            this.loading = false;
	        })

		}).catch(error => {
		   runInAction(() => {
	          this.loading = true;
	        })
	    });
	    
	}

	@action getAll = (datas, callback) => {
		Api.get('/piste/', {
			params : datas
		}).then(({data}) => {
			callback(data);
		}).catch(error => {
	       callback(error.response);
		});
		
	}

	@action fetch = (data, callback) => {
		
		if(data.limit) this.limit = data.limit;
		if(data.by) this.by = data.by;
		if(data.direction) this.direction = data.direction;	
		if(data.sortie) this.sortie = data.sortie;
		if(data.playlist) this.playlist = data.playlist;
		if(data.artistes) this.artiste = data.artiste;

	    let values = {
	      limit: data.limit,
	      offset: this.offset, 
	      by: this.by, 
	      direction: this.direction
		}
		
		if(this.artiste && data.artiste) values["artiste"] = this.artiste;

		if(this.playlist && data.playlist) values['playlist'] = this.playlist;

		if(this.sortie && data.sortie)	values['sortie'] = this.sortie;

	    this.getAll(values, (errors) => {

	      if (typeof errors === 'object' && errors.status === 200) {
			//   this.setData([...errors.data])
			  callback([...errors.data])
	      }    

	    })

	}

}

let pisteStore = new PisteStore();

export { pisteStore };