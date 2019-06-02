<template>
  <div>
    <header-home></header-home>
    <div>
    </div>
    <form id="createsong" v-on:submit.prevent="create">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h1>Create Song</h1>
            </div>
            <div class="panel panel-info col-sm-4 left">
                <div class="panel-heading">Song info</div>
                <div class="panel-body">
                    <div class="form-group">
                        <label class="title">title</label>
                        <input 
                            type="text"
                            name="title"
                            class="form-control"
                            v-model="title"
                            v-validate="'required'"
                            data-vv-validate-on="blur"
                            placeholder="Name of the song">
                        <small 
                            v-show="errors.has('title')"
                            class="text-danger form-text">
                                {{ errors.first('title') }}
                            </small>
                    </div>
                    <div class="form-group">
                        <label class="title">artist</label>
                        <input 
                            type="text" 
                            name="artist"
                            class="form-control"
                            v-model="artist"
                            v-validate="'required'"
                            data-vv-validate-on="blur" 
                            placeholder="name of the artist">
                        <small 
                            v-show="errors.has('artist')"
                            class="text-danger form-text">
                                {{ errors.first('artist') }}
                        </small>
                    </div>
                    <div class="form-group">
                        <label class="title">album</label>
                        <input 
                            type="text" 
                            name="album"
                            class="form-control"
                            v-model="album"
                            v-validate="'required'"
                            data-vv-validate-on="blur" 
                            placeholder="From album">
                        <small 
                            v-show="errors.has('album')"
                            class="text-danger form-text">
                                {{ errors.first('album') }}
                        </small>
                    </div>
                    <div class="form-group">
                        <label class="title">YoutubeLink</label>
                        <input 
                            type="text" 
                            name="idYoutube"
                            class="form-control"
                            v-model="idYoutube"
                            v-validate="'required'"
                            data-vv-validate-on="blur" 
                            placeholder="please enter youtube link here">
                        <small 
                            v-show="errors.has('youtubeID')"
                            class="text-danger form-text">
                                {{ errors.first('youtubeID') }}
                        </small>
                    </div>
                    <div class="form-group">
                        <label class="title">Song IMG</label>
                        <input 
                            type="file" 
                            class="form-control"
                            ref="file"
                            data-vv-validate-on="blur" 
                            v-on:change="handleFileUpload()"
                            placeholder="please enter youtube link here">
                        <small 
                            v-show="errors.has('img-song')"
                            class="text-danger form-text">
                                {{ errors.first('img-song') }}
                        </small>
                    </div>
                </div>
            </div>  
            <div class="panel panel-info col-sm-8 right">
                <div class="panel-heading">Song Structure</div>
                <div class="panel-body">
                    <div class="form-group">
                        <label class="title">lyrics and Tabs</label>
                        <textarea
                            rows="10" 
                            type="textarea" 
                            name="lyricsAndTabs"
                            class="form-control"
                            v-model="lyricsAndTabs"
                            v-validate="'required'"
                            data-vv-validate-on="blur" 
                            placeholder="you gave me a song, so don't let me find the lyrics ">
                        </textarea>
                        <small 
                            v-show="errors.has('lyricsTabs')"
                            class="text-danger form-text">
                                {{ errors.first('lyricsTabs') }}
                            </small>
                    </div>
                </div>
            </div> 
        </div>
                <button class="btn btn-primary">Create</button> 
    </form>
    <pre v-if="mess">{{mess}}</pre>
  </div>
</template>

<script>
import headerHome from '../home/header'
import { Validator } from 'vee-validate'   
export default {
  name: 'createSong',
  components: {
    headerHome,
  },
  computed: {
    // mix the getters into computed with object spread operator
    mess () {
        return this.$store.songs.state.mess
    }
  },
  data () {
    return {
        title: '',
        artist: '',
        album: '',
        imgAlbum: '',
        idYoutube:'',
        lyricsAndTabs: ''
    }
  },
  methods: {
    create () {
        this.$validator.validate()
        .then (valid => {
            if(valid) {
                let createsong = document.getElementById('createsong');
                let formData = new FormData(createsong);
                console.log(createsong);
                formData.append('file', this.imgAlbum);
                formData.append('userID', localStorage.token);
                // console.log(formData.songInfo);
                this.$store.songs.dispatch('createSong' ,
                    formData)
            }
        })
        .catch(err => {
            console.log(err);
            
        })
    },
    handleFileUpload () {
      this.imgAlbum =  this.$refs.file.files[0]    
      console.log(this.imgAlbum);
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .title{
        float: left;
    }
</style>
