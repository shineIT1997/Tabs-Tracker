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
                            <label class="title">YoutubeID</label>
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
            <v-btn v-if="check.token" @click="edit(song._id)">
              Edit
            </v-btn>
            <v-btn v-if="check.token" @click="bookmark(song._id)">
              {{(check.checkBookmark)?(check.checkBookmark.indexOf(song._id)== -1)?'Bookmark':'Unbookmark':'Unbookmark'}}
            </v-btn>
            <v-btn  v-if="check.token" @click="Love(song._id)">
              {{(favorites.checkFavorites)?(favorites.checkFavorites.indexOf(song._id)== -1)?'Love':'Loved':'Love'}}
            </v-btn>
        </div>
    </form>

    <div>


    <!-- commment  -->

    <div class="comment-container">
      <h1> Comments</h1>
      <div>
        <form>
          <textarea
            name="comment" 
            v-model="contentComment" 
            v-validate="'required'" 
            class="textarea-cmt" 
            placeholder="Add Your Commment"></textarea>
          <small 
              v-if="errorComment"
              class="text-danger form-text">
            Please enter comment
          </small>
        </form>
        <button @click.prevent="comment(song._id)" class="main-btn">Comment</button>
      </div>
      <div v-for="comment in comments" v-bind:key="comment._id">
        <div v-if="comment.root" class="comment"  >
            <div class="img-avatar">
              <img src="../../assets/image/team3.jpg" alt="">
            </div>
            <div class="content-comment">
              <div class="header-comment">
                <span class="name-user">
                  {{(comment.userID)?comment.userID.usersName:'Guest'}}
                </span>
                <span class="time">
                  {{comment.updatedAt}}
                </span> 
                <button  @click.prevent="showBoxRep(comment._id)">Reply  <img src="../../assets/image/reply-512.png" alt=""></button>
              </div>
              <div class="content-cmt">
                <p>{{comment.content}}</p>
              </div>
            </div>
            <div class="box-reply" v-bind:class="comment._id">
              <p>Leave a reply</p>
              <form>
                <textarea
                  v-bind:name="comment._id"
                  ref="repcmt"
                  v-validate="'required'"
                class="textarea-cmt" placeholder="Add Your Commment"></textarea>
                <small 
                  v-if="( errorComment == comment._id )?true:false"
                  class="text-danger form-text">
                  Please enter comment
                </small>
                <button @click.prevent="reply(song._id , comment._id , comment._id )" class="main-btn">Comment</button>
              </form>
            </div>
            <!-- reply -->
            <div class="reply-content" v-for="rep in comment.reply" v-bind:key="rep._id">
              <div class="comment">
                <div class="img-avatar">
                  <img src="../../assets/image/team3.jpg" alt="">
                </div>
                <div class="content-comment">
                  <div class="header-comment">
                    <span class="name-user">
                      {{(rep.userID)?rep.userID.usersName:'Guest'}}
                    </span>
                    <span class="time">
                      {{rep.updatedAt}}
                    </span> 
                    <button  @click.prevent="showBoxRep(rep._id)">Reply  <img src="../../assets/image/reply-512.png" alt=""></button>
                  </div>
                  <div class="content-cmt">
                    <p>{{rep.content}}</p>
                  </div>
                </div>
                  <div class="box-reply" v-bind:class="rep._id">
                    <p>Leave a reply</p>
                    <form>
                      <textarea
                        v-bind:name="rep._id"
                        ref="repcmt"
                        v-validate="'required'"
                      class="textarea-cmt" placeholder="Add Your Commment"></textarea>
                      <small 
                        v-if="(errorComment == rep._id)?true:false"
                        class="text-danger form-text">
                        Please enter comment
                      </small>
                      <button @click.prevent="reply(song._id , comment._id  , rep._id)" class="main-btn">Comment</button>
                    </form>
                  </div>
              </div>
            </div>
        </div>
      </div>
    </div>
    </div>


    <!-- all comment -->
    <hr>
    <footer-home></footer-home>
  </div>
</template>

<script>
import headerHome from '../home/header'
import footerHome from '../home/footer'
import { Validator } from 'vee-validate'   
export default {
  name: 'detailSong',
  components: {
    headerHome,
    footerHome
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
    check () {
      return this.$store.users.getters.getDataUser
    },
    favorites () {
      return this.$store.songs.getters.getDataSong
    },
  },
  data () {
    return {
      isDisabled: true,
      contentComment: '',
      errorComment: false,
      repComment: true,
    }
  },
  methods: {
    Love (songID) {
      this.$store.songs.dispatch('rating' , {
        songID : songID,
        userID: localStorage.token
      })
    },
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
      // Comment file bằng formData phải dùng multer ở Back-end
      let createsong = document.getElementById('editSong');
      let info = new FormData(createsong);
      info.append('_id' , songID)
      this.$store.songs.dispatch('editSong' , info)
    },
    bookmark (songID) {
      this.$store.users.dispatch('bookmark' , {
        songID: songID,
        userID: localStorage.token
      })
    },
    showBoxRep(id) {
      if(this.repComment) {
        this.repComment = false
        $('.'.concat(id)).css({display: 'block'})
      }
      else {
        this.repComment = true
        $('.'.concat(id)).css({display: 'none'})
      }
    }
  },
  async mounted() { 
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
    await this.$store.users.dispatch('checkBookmark' , {
      userID : localStorage.token,
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
    .comment {
    padding-top: 20px;
    background-color: #FFF;
    border-top: 1px solid #546E7A;
    margin-top: 10px;
    }
    .comment-container {
       width: 70%;
       margin: auto;
    }
    .comment-container h1 {
      text-align: left;
    }
    .img-avatar {
      display: table-cell;
      vertical-align: top;
      padding-right: 20px;
      padding-left: 20px;
    }
    .img-avatar img {
    width: 70px;
    vertical-align: middle;
    border: 0;
    border-radius: 50%;
    }


    .content-comment {
      overflow: hidden;
      zoom: 1;
      width: 100%;
      display: table-cell;
      vertical-align: top;
      /* width: 80%; */
      margin: auto;
    }
    .header-comment {
      text-align: left;
    }
    .name-user {
      text-transform: uppercase;
      margin-bottom: 10px;
      font-family: 'Montserrat', sans-serif;
      font-weight: 700;
    }
    .header-comment button {
      float: right;
      margin: 0;
      font-size: 12px;
      text-transform: uppercase;
      font-weight: 400;
      height: 20px;
      width: 70px;
      background: #90CAF9;
      box-shadow: none;
      border-radius: 10px;
      border: none;
      outline:none;
    }
    .header-comment button:hover {
      background: #0277BD;
    }
    .header-comment button img{
      height: 70%;
    }
    .content-cmt {
      text-align: left;
    }
    .time {
      margin-left: 20px;
    }

    .reply-content {
      width: 90%;
      position: relative;
      left: 10%;
      margin-top: 20px;
    }
    .textarea-cmt {
      padding: 10px 10px;
      min-height: 80px;
      max-height: 150px;
      resize: vertical;
      height: 40px;
      width: 100%;
      border: none;
      background: #F4F4F4;
      border-bottom: 2px solid #EEE;
      color: #354052;
      padding: 0px 10px;
      opacity: 1;
    }
    .box-reply {
      margin-top: 20px;
      text-align: left;
      display: none;
    }
    .box-reply p {
      font-family: 'Montserrat', sans-serif;
      font-weight: 700;
      color: #10161A;
      text-align: left;
      border-bottom: solid 2px blue
    }
    .main-btn  {
      display: inline-block;
      padding: 10px 35px;
      margin: 3px;
      border: 2px solid transparent;
      border-radius: 3px;
      -webkit-transition: 0.2s opacity;
      transition: 0.2s opacity;
      background: #6195FF;
      color: #FFF;
      left: 0px;
    }
    small {
      display: block;
    }
</style>
