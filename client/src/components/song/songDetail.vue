<template>
  <div>
    <header-home></header-home>
    <form id="editSong">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h1>Song Detail</h1>
            </div>
            <div class="container">
              <div class="row">
                <div class="col-sm-6">
                  <div class="panel panel-info middle">
                      <div class="panel-heading">Lyrics and Tabs</div>
                      <div >
                          <div class="form-group">
                              <textarea
                                  v-bind:disabled="isDisabled" 
                                  rows="35" 
                                  type="textarea" 
                                  name="lyricsAndTabs"
                                  v-model="song.lyricsAndTabs"
                                  class="form-control"
                                  placeholder="you gave me a song, so don't let me find the lyrics ">
                              </textarea>
                          </div>
                      </div>
                  </div> 
                </div>
                <div class=" col-sm-6">
                  <div class="panel panel-info col-sm-12">
                    <div class="panel-heading">Song info</div>
                    <div class="panel-body">
                        <div class="form-group">
                            <label class="title">title</label>
                            <input 
                                v-bind:disabled="isDisabled"
                                type="text"
                                name="title"
                                v-model="song.title"
                                class="form-control"
                                placeholder="Name of the song">
                        </div>
                        <div class="form-group">
                            <label class="title">artist</label>
                            <input
                                v-bind:disabled="isDisabled" 
                                type="text" 
                                name="artist"
                                v-model="song.artist"
                                class="form-control"
                                placeholder="name of the artist">
                        </div>
                        <div class="form-group">
                            <label class="title">album</label>
                            <input
                                v-bind:disabled="isDisabled" 
                                type="text" 
                                name="album"
                                v-model="song.album"
                                class="form-control"
                                placeholder="From album">
                        </div>
                        <div class="form-group">
                            <label class="title">YoutubeLink</label>
                            <input
                                v-bind:disabled="isDisabled" 
                                type="text" 
                                name="idYoutube"
                                v-model="song.idYoutube"
                                class="form-control"
                                placeholder="please enter youtube link here">
                        </div>
                        <!-- <div class="form-group">
                            <label class="title">Song IMG</label>
                            <input
                                v-bind:disabled="isDisabled" 
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
                        </div> -->
                    </div>
                  </div>
                <div class="col-sm-12">
                  <!-- <youtube :video-id="getData.detailSong.youTubeID"></youtube> -->
                <youtube :video-id="song.idYoutube"></youtube>
                </div>
                </div>
              </div>
            </div>
            <v-btn v-if="loginCheck" @click="edit(song._id)">
              Edit
            </v-btn>
            <v-btn v-if="loginCheck" @click="bookmark(song._id)">
              Bookmark
            </v-btn>
            <v-btn @click="Love(song._id)">
              Love
            </v-btn>
        </div>
    </form>

    <div>
      <div class="new-comment panel panel-info">
        <h1 >Comment: </h1>
        <div class="panel-body">
          <input name="comment" v-model="contentComment" 
                  v-validate="'required'" >
                  <small 
                    v-if="errorComment"
                    class="text-danger form-text">
                    Please enter comment
                  </small>
        </div>
        <button @click.prevent="comment(song._id)">Send</button>
      </div>
    </div>

    <!-- all comment -->
    <div>
      <div  v-for="comment in comments" v-bind:key="comment._id">
        <div v-if="comment.root" class="all-comment panel panel-primary">
          <h1 class="panel-heading"> {{(comment.userID)?comment.userID.usersName:'Guest'}}</h1>
          <div class="panel-body">
              <p>{{comment.content}}</p>
                <div class="new-comment panel panel-info">
                  <h1 >Reply: </h1>
                  <div class="panel-body">
                    <input
                            v-bind:name="comment._id"
                            ref="repcmt"
                            v-validate="'required'" >
                            <small 
                              v-if="( errorComment == comment._id )?true:false"
                              class="text-danger form-text">
                              Please enter comment
                            </small>
                  </div>
                  <v-btn @click.prevent="reply(song._id , comment._id , comment._id )" >Send</v-btn>
                </div>
                <pre>{{comment.reply}}</pre>
                <div v-for="rep in comment.reply" v-bind:key="rep._id">
                  <div  class="panel panel-info">
                    <h2 class="panel-heading">{{(rep.userID)?rep.userID.usersName:'Guest'}}</h2>
                    <div class="panel-body">
                      <p>{{rep.content}}</p>
                        <div class="new-comment panel panel-info">
                        <h1 >Reply: </h1>
                        <div class="panel-body">
                          <input
                                  v-bind:name="rep._id"
                                  ref="repcmt"
                                  v-validate="'required'" >
                                  <small 
                                    v-if="(errorComment == rep._id)?true:false"
                                    class="text-danger form-text">
                                    Please enter comment
                                  </small>
                        </div>
                        <v-btn @click.prevent="reply(song._id , comment._id  , rep._id)" >Send</v-btn>
                      </div>
                    </div>
                  </div>
                </div>
        </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerHome from '../home/header'
import { Validator } from 'vee-validate'   
export default {
  name: 'detailSong',
  components: {
    headerHome
  },
  computed: {
     song () {
      let song = {
        lyricsAndTabs: '',
        title: '',
        artist: '',
        album: '',
        idYoutube: '',
        _id: ''
      }
      if (this.$store.songs.getters.getDataSong.songDetail) {
        for(let key in song) {
          song[key] = this.$store.songs.getters.getDataSong.songDetail[key]
        }
      }
      return song
    },
    comments () {
      return this.$store.comments.getters.getCommentData.comments
    },
    loginCheck () {
      return this.$store.users.getters.getDataUser.token
    },
  },
  data () {
    return {
      isDisabled: true,
      contentComment: '',
      errorComment: false,
      repComment: ''
    }
  },
  methods: {
    async comment (songID) {
      this.$validator.validate('comment').then(async valid => {
          if(valid) {
            this.errorComment = false
            console.log(songID);
            await this.$store.comments.dispatch('newComment' , {
              userID: localStorage.token,
              songID: songID,
              content: this.contentComment
            })
          }
        else{
          this.errorComment = true
        }
      })
    },
    async reply (songID , commentID , repValue) {
      let content //nội dung comment
      this.$validator.validate(repValue).then(async valid => {
        if(valid) {
          for( let key in this.$refs.repcmt) {
            if(this.$refs.repcmt[key].name == repValue && this.$refs.repcmt[key].value) {
              content = this.$refs.repcmt[key].value
              console.log(this.$refs.repcmt[key].value);
            }
          }
          console.log(content);
          await this.$store.comments.dispatch('replyComment' , {
            info: {
              userID: localStorage.token,
              songID: songID,
              content: content
            },
            replyID: commentID
            })
        }
        else {
          this.errorComment = repValue
        }
      })
    },
    edit (songID) {
      // submit file bằng formData phải dùng multer ở Back-end
      let createsong = document.getElementById('editSong');
      let info = new FormData(createsong);
      info.append('_id' , songID)
      this.$store.songs.dispatch('editSong' , info)
    },
    bookmark (songID) {
      console.log(localStorage.token);
      // this.$store.songs.dispatch('editSong' , {
      //   songID: so
      // })
    },
  },
  async mounted() {
    console.log(this.$route.params.songID);  
    let songID = this.$route.params.songID
    await this.$store.songs.dispatch('getDetailSong' , {
        songID
    })
    if(this.$store.songs.getters.getDataSong.songDetail.userID === localStorage.token) {
      this.isDisabled = false
    }
    else{ 
      this.isDisabled = true
    }
    await this.$store.comments.dispatch('getCommentForSong' , {
      songID
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .title{
        float: left;
    }
    .middle {
      left: 50%;
      transform: translate(-50% ,0px);
      position: relative;
    }
    input {
      border: none;
      border-bottom: 1px solid;
    }
    input:disabled {
      border: none;
      background: none;
      shadow : none;
      cursor: default;
      box-shadow: none
    }
    textarea:disabled {
      border: none;
      background: none;
      shadow : none;
      cursor: default
    }
    .all-comment{
      text-align: left;
    }
</style>
