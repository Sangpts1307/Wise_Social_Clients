<template>
  <div class="main-ws-sec">
    <div class="post-topbar">
      <textarea v-model="posts" name="post_area" id="post_area" class="form-control">何を考えていますか?</textarea>
      <div class="chose-image">
        <ul>
          <li>
            <label for="btn_chose_file" class="btn btn-danger" title="Chose file .png or .jpeg">画像を選択</label>
            <input @change="chooseImage" accept=".jpg, .jpeg, .png" type="file" class="btn btn-danger" name="chose-file"
              id="btn_chose_file" />
          </li>
        </ul>
      </div>
      <div class="post-st">
        <ul>
          <li>
            <a class="active" v-on:click="submit()" href="#" title="Submit post data">Submit</a>
          </li>
        </ul>
      </div>
      <!--post-st end-->
    </div>

    <!--post-topbar end-->
    <div class="posts-section">

      <div v-for="post in timelinePost" class="posty">
        <div class="post-bar no-margin">
          <div class="post_topbar">
            <div class="usy-dt">
              <img width="52px" v-if="post.author._avatar != null" :src="post.author._avatar" :alt="post.author.name"
                :title="post.author.name" />
              <img width="52px" v-else src="../assets/images/resources/us-pc2.png" alt="">

              <div class="usy-name">
                <h3>{{ post.author.name }}</h3>
                <span><img src="../assets/images/clock.png" alt="" />{{ post.since_created }}</span>
              </div>
            </div>
            <div class="ed-opts">
              <!-- Not my own post here none -->
            </div>
          </div>

          <div class="epi-sec">
            <!-- Begin of description section which includes experience and location -->
            <ul class="descp">
              <!-- Display experience icon and experience text if available -->
              <li>
                <img src="../assets/images/icon8.png" alt="Experience Icon" /><span>{{ post.experiences }}</span>
              </li>
              <!-- Display location icon and location text if available, otherwise show default location -->
              <li>
                <img src="../assets/images/icon9.png" alt="Location Icon" />
                <span v-if="post.location">{{ post.location }}</span>
                <span v-else>Vietnam</span>
              </li>
            </ul>
            <!-- End of description section -->

            <!-- Begin of bookmark section which includes bookmark functionality -->
            <ul class="bk-links">
              <!-- Display bookmark icon with grey background if post is bookmarked, otherwise with default background -->
              <li>
                <p v-if="post.favorites.length > 0" title="Bookmark" v-on:click="removeFavorite(post.id)">
                  <i style="background-color: grey;" class="fa fa-bookmark"></i>
                </p>
                <p v-else title="Bookmark" v-on:click="addFavorite(post.id)">
                  <i class="fa fa-bookmark"></i>
                </p>
              </li>
            </ul>
            <!-- End of bookmark section -->
          </div>

          <!-- Begin of the job description section -->
          <div class="job_descp">
            <!-- Display short content of the post if available and read more is not clicked -->
            <div class="content" v-if="post.short_content && showReadMore.indexOf(post.id) == -1">
              {{ post.short_content }}
              <!-- Show the 'see more' link to read full content -->
              <span class="text-danger txt-readmore" v-on:click="readMore(post.id)"> ... See more</span>
            </div>
            <!-- Display full content of the post if read more is clicked -->
            <div class="content" v-else> {{ post.content }}</div>
            <br>
            <!-- Display skill tags if there are any skills associated with the post -->
            <ul class="skill-tags" v-if="post.skills.length > 0">
              <!-- Loop through each skill and display it as a list item -->
              <li v-for="skill in post.skills">
                <a href="#" title="">{{ skill.skill }}</a>
              </li>
            </ul>
          </div>
          <!-- End of the job description section -->

          <div class="job-status-bar">
            <ul class="like-com">
              <li>
                <a v-if="post.is_like == 0" v-on:click="like(post.id, 'like')"
                  class="color-b2b2b2 cusror-poiter hover-color">
                  <i class="fa fa-heart"></i> Like ({{ post.total_like }})
                </a>
                <a v-else v-on:click="like(post.id, 'unlike')" class="color-b2b2b2 cusror-poiter hover-color">
                  <i class="fa fa-heart text-danger"></i> Unlike ({{ post.total_like }})
                </a>
              </li>
              <li>
                <a v-on:click="showComment(post.id)" class="color-b2b2b2 cusror-poiter hover-color">
                  <i class="fa fa-comment-alt"></i> Comment ({{ post.total_comment }})</a>
              </li>
            </ul>
            <a href="#"><i class="fa fa-eye"></i>Views ({{ post.view_count }})</a>
          </div>
        </div>
        <!--post-bar end-->

        <div v-if="post.id == postShowingComment" class="comment-section">
          <div class="comment-sec">
            <ul v-if="Array.isArray(listComments)">
              <li v-for="comment in listComments" v-bind:key="comment.id">
                <div class="comment-list">
                  <div class="bg-img">
                    <img v-if="comment.avatar" class="ava-cmt" :src="comment._avatar" :alt="comment.name" />
                    <img v-else class="ava-cmt"
                      src="http://localhost/wisesocial_api/public/avatars/example/user-pro-img.png"
                      :alt="comment.name" />
                  </div>
                  <div class="comment">
                    <h3>{{ comment.name }}</h3>
                    <span><img src="../assets/images/clock.png" alt="{{  }}" />{{ comment._created_at }}</span>
                    <p>{{ comment.comment }}</p>
                    <p v-on:click="replyComment(comment.id, comment.name)" href="#" title="" class="active">
                      <i class="fa fa-reply-all"></i>Reply
                    </p>
                  </div>
                </div>
                <!--comment-list end-->
                <!-- Reply begin -->
                <ul v-if="Array.isArray(comment.child)">
                  <li v-for="subComment in comment.child" :key="subComment.id">
                    <div class="comment-list">
                      <div class="bg-img">
                        <img width="38px" v-if="subComment.author._avatar" :src="subComment.author._avatar" alt="" />
                        <img width="38px" v-else src="../assets/images/resources/bg-img2.png" alt="" />
                      </div>
                      <div class="comment">
                        <h3>{{ subComment.author.name }}</h3>
                        <span><img src="../assets/images/clock.png" alt="" />
                          {{ subComment._created_at }}</span>
                        <p>
                          {{ subComment.comment }}
                        </p>
                      </div>
                    </div>
                    <!--comment-list end-->
                  </li>
                </ul>
                <!-- End reply -->
              </li>
            </ul>
          </div>
          <!--comment-sec end-->
          <div class="post-comment">
            <div class="comment_box">
              <form action="#">
                <label v-if="replyingTo" class="text-danger" for="comment_form">{{ this.replyingTo }}</label>
                <input type="text" id="comment_form" placeholder="Write your comment" v-model="comment" />
                <button v-on:click.prevent="sendComment()" type="button">
                  <i class="fa fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
          <!--post-comment end-->
        </div>
        <!--comment-section end-->
      </div>
      <!--posty end-->

      <div class="process-comm">
        <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      </div>
      <!--process-comm end-->

    </div>
    <!--posts-section end-->

  </div>
</template>

<script>
// import Vue from 'vue'
import axios from "axios";

// import component1 from 'component1'
// import component2 from 'component2'

// bat dau phan than cua chuong trinh vuejs
export default {
  /***********************************************************************************************************
   ******************************* Pass data to child component **********************************************
   **********************************************************************************************************/
  // props: [variable1, variable2],
  // components: {component1, component2},

  /**
   * Define global service socket
   *
   * Listing event from socket.io server
   * "ServerSendCommentToClient" is the name of the channel that sends notifications to all clients installed in the server socket
  */
  sockets: {
    // Send data to server
    ClientSendMessageToServer: function (responseComment) {
      this.comment = responseComment;
    },
    // Listen event from server and render data
    ServerSendMessageToClient: function (responseComment) {
      // Push to the comment list
      if (responseComment.type === 'comment') {
        // Xu ly cho comment
        let parentId = parseInt(responseComment.parent_id);
        if (parentId == 0) {
          // Là comment cha
          this.listComments.push(responseComment);
        } else {
          // Là comment con
          for (let i = 0; i < this.listComments.length; i++) {
            if (this.listComments[i].id == parentId) {
              if (Array.isArray(this.listComments[i].child)) {
                // Đẩy vào mảng có sẵn
                this.listComments[i].child.push(responseComment);
              } else {
                // Tạo mảng child mới (giữ reactive)
                this.listComments[i] = {
                  ...this.listComments[i],
                  child: [responseComment]
                };
              }
              break;
            }
          }
        }
        // Force Vue render lại nếu cần
        this.listComments = [...this.listComments];
        // Update lai toan bo component
        this.$forceUpdate();
      } else if (responseComment.type === 'message') {
        // Xu ly cho message
      } else {
        console.log("Socket error!");
      }
    },
  },
  data() {
    /***********************************************************************************************************
     ******************************* Initialize global variables ***********************************************
    **********************************************************************************************************/
    return {
      msg: "Hello world!",
      users: [],
      posts: "",
      postImage: null,
      token: sessionStorage.getItem("token"),

      offset: 0,
      commentOffset: 0,
      limit: 6,

      timelinePost: [],
      showReadMore: [],
      postShowingComment: null,

      comment: '',
      parent: 0,
      listComments: [],
      replyingTo: null,
    };
  },
  created() {
    /***********************************************************************************************************
     *********************** Initialize data when this component is used. **************************************
     **********************************************************************************************************/
    console.log(
      "Init created component and call to function get data from api server."
    );
    this.timeLine();
  },
  mounted() {
    /***********************************************************************************************************
     ******************** Once created, the interface is displayed and calls mounted. **************************
     **********************************************************************************************************/
  },
  watch: {
    /***********************************************************************************************************
     ********************************* Methods change value for a variable *************************************
     **********************************************************************************************************/
    msg() {
      console.log(
        "When the value of the msg variable changes, this method will be executed."
      );
    },
  },
  computed: {
    appendMsg() {
      return (
        msg +
        "Process the value and assign the value to the corresponding variable the var has changed."
      );
    },
  },
  methods: {
    /***********************************************************************************************************
     ******************************* Default functions that handle local data **********************************
     **********************************************************************************************************/

    /**
     * Example default function not using param
     */
    defaultFunction() {
      this.msg = "Replace message here!";
    },

    // Function to handle image selection from the file input
    chooseImage(event) {
      // Get the selected file from the event
      let file = event.target.files[0];

      // Check if the file is not a JPEG or PNG image
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        alert("Wrong image format. Please upload a JPEG or PNG image.");
        return null;
      }

      // Check if the file size exceeds 2MB (2048000 bytes)
      if (file.size > 2048000) {
        alert("Only images smaller than 2MB are allowed.");
        return null;
      }

      // Assign the selected file to the postImage variable
      this.postImage = file;
    },

    // Asynchronous function to submit a new post with content and an optional image
    async submit() {
      // Check if the post content is empty or null
      if (this.posts == '' || this.posts == null) {
        alert("Post content is empty. Please enter some content.");
        return null;
      }

      // Create a new FormData object to hold the post data
      let formData = new FormData();
      // Append the post content to the FormData object
      formData.append('content', this.posts);
      // Append the image file to the FormData object if it exists
      formData.append('image', this.postImage);

      // Send a POST request to the server to create a new post
      try {
        const callAPI = await axios.post(
          "http://localhost/learning-php-laravel-wisesocial-api/public/api/create-post",
          formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
            Authorization: "Bearer " + this.token, // Include the authorization token
          }
        }
        );

        // Check if the API call was successful
        if (callAPI.data.code == 200) {
          // Update the suggestFriend data with the response data
          this.suggestFriend = callAPI.data.data;
          // TODO: Reload all posts to include the newly created post
          return null;
        } else {
          // Alert the user if the API call failed
          alert("Call API failed, please check again!");
        }
        // Log the API response data to the console
        console.log(callAPI.data);
      } catch (err) {
        // Log any errors to the console
        console.log(err);
      }
    },

    /**
     * Fetches the user's timeline data from the server.
     */
    async timeLine() {
      try {
        // Make a GET request to the timeline API endpoint
        const callAPI = await axios.get(
          "http://localhost/learning-php-laravel-wisesocial-api/public/api/timeline",
          {
            headers: {
              "Content-Type": "application/json", // Set the content type to JSON
              Authorization: "Bearer " + this.token, // Include the authorization token
            },
            params: {
              offset: this.offset, // Offset for pagination
              limit: this.limit // Limit the number of posts fetched
            }
          }
        );

        // Check if the API call was successful
        if (callAPI.data.code == 200) {
          // Assign the fetched timeline data to the timelinePost variable
          this.timelinePost = callAPI.data.data;
        } else {
          // Alert the user if the API call failed
          alert("Call API failed, please check again!");
        }
      } catch (err) {
        // Log any errors to the console
        console.log(err);
      } finally {
        // Re-enable the button for adding Friend (if previously disabled)
        // this.isAddingFriend[friendId] = false;
      }
    },

    /**
     * Adds the postId to the showReadMore array to indicate that the post should be expanded.
     * @param {number} postId - The ID of the post to expand.
     */
    readMore(postId) {
      this.showReadMore.push(postId); // Add the postId to the showReadMore array
    },

    /**
     * Adds a bookmark for a specific post.
     * @param {number} postId - The ID of the post to bookmark.
     */
    async addFavorite(postId) {
      try {
        // Make a GET request to the add-favorite API endpoint
        const callAPI = await axios.get(
          "http://localhost/learning-php-laravel-wisesocial-api/public/api/add-favorite",
          {
            headers: {
              "Content-Type": "application/json", // Set the content type to JSON
              Authorization: "Bearer " + this.token, // Include the authorization token
            },
            params: {
              post_id: postId // Include the post ID as a parameter
            }
          }
        );

        // Check if the API call was successful
        if (callAPI.data.code == 200) {
          // Handle successful response
          const index = this.timelinePost.findIndex(post => post.id === postId);
          if (index !== -1) {
            this.timelinePost[index].favorites.push({ post_id: postId });
          }
        } else {
          // Alert the user if the API call failed
          alert("Call API failed, please check again!");
        }
      } catch (err) {
        // Log any errors to the console
        console.log(err);
      }
    },

    /**
     * Removes a bookmark for a specific post.
     * @param {number} postId - The ID of the post to remove from bookmarks.
     */
    async removeFavorite(postId) {
      try {
        // Make a GET request to the remove-favorite API endpoint
        const callAPI = await axios.get(
          "http://localhost/learning-php-laravel-wisesocial-api/public/api/remove-favorite",
          {
            headers: {
              "Content-Type": "application/json", // Set the content type to JSON
              Authorization: "Bearer " + this.token, // Include the authorization token
            },
            params: {
              post_id: postId // Include the post ID as a parameter
            }
          }
        );

        // Check if the API call was successful
        if (callAPI.data.code == 200) {
          // Handle successful response
          const index = this.timelinePost.findIndex(post => post.id === postId);
          if (index !== -1) {
            this.timelinePost[index].favorites = [];
          }
        } else {
          // Alert the user if the API call failed
          alert("Call API failed, please check again!");
        }
      } catch (err) {
        // Log any errors to the console
        console.log(err);
      }
    },

    /**
     * Handles liking or unliking a post.
     * Makes an API call to like or unlike the post and updates the local state.
     * @param {number} postId - The ID of the post to like/unlike.
     * @param {string} action - The action to perform ('like' or 'unlike').
     */
    async like(postId, action) {
      try {
        // Make a GET request to the like/unlike API endpoint
        const callAPI = await axios.get(
          "http://localhost/learning-php-laravel-wisesocial-api/public/api/like",
          {
            headers: {
              "Content-Type": "application/json", // Set the content type to JSON
              Authorization: "Bearer " + this.token, // Include the authorization token
            },
            params: {
              post_id: postId, // Include the post ID as a parameter
              action: action // Like/Unlike action
            }
          }
        );

        // Check if the API call was successful (status code 200)
        if (callAPI.data.code == 200) {
          console.log(callAPI.data.data);
          // Find the index of the post in the local timelinePost array
          const index = this.timelinePost.findIndex(post => post.id === postId);

          // Ensure the post is found before attempting to update
          // NOTE: The original code had `index !== 1`, which seems incorrect. It should likely be `index !== -1`.
          // Assuming `index !== -1` is the intended logic.
          if (index !== -1) {
            // The following line `this.timelinePost[index.favorites = [];` seems unrelated to the like/unlike logic.
            // It clears the favorites for the post. It might be a bug or intended for a different purpose.
            // Keeping it as is based on the original code, but noting its potential irrelevance here.
            this.timelinePost[index].favorites = [];

            // Update the post's like status and count based on the action
            if (this.timelinePost[index].id == postId && action == 'like') {
              this.timelinePost[index].is_like = 1; // Mark post as liked by the current user
              this.timelinePost[index].total_like++; // Increment the total like count
            }
            if (this.timelinePost[index].id == postId && action == 'unlike') {
              this.timelinePost[index].is_like = 0; // Mark post as not liked by the current user
              this.timelinePost[index].total_like--; // Decrement the total like count
            }
          }
        } else {
          // Alert the user if the API call returned an error code
          alert("Call API failed, please check again!");
        }
      } catch (err) {
        // Log any errors that occurred during the API call
        console.log(err);
      }
    },

    /**
     * Asynchronously fetches comments for a given post ID.
     * Sets the post ID to a local variable to control comment visibility.
     * Makes an API call to retrieve comments with pagination.
     *
     * @param {number} postId - The ID of the post for which to fetch comments.
     */
    async showComment(postId) {
      // Set the ID of the post whose comments are currently being shown
      this.postShowingComment = postId;
      // Discard Replying to (if any)
      this.parent = 0;
      this.replyingTo = null;
      this.$socket.emit('ClientSendMessageToServer', {
          id : postId,
          comment : "",
          avatar : "",
          name : "",
          created_at : "",
          updated_at : "", 
          parent_id : null,
          child : null,
          post_id : postId,
          type : "comment",
          action: "join"
      });

      // Make an API call to fetch comments for the post
      const callAPI = await axios.get(
        "http://localhost/learning-php-laravel-wisesocial-api/public/api/list-comment",
        {
          headers: {
            // Set request headers, including authorization token
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.token,
          },
          params: {
            // Include post ID, offset, and limit for pagination
            post_id: postId,
            offset: this.commentOffset,
            limit: this.limit,
          }
        }
      );

      this.listComments = callAPI.data.data;
    },

    /**
     * Sends a new comment to the server for the currently selected post.
     * Creates FormData with post ID, comment text, and parent ID (for replies).
     * Clears the comment input field upon success.
     */
    async sendComment() {
      let formData = new FormData();
      formData.append('post_id', this.postShowingComment);
      formData.append('comment', this.comment);
      formData.append('parent', this.parent); // 0 for top-level comment, parent comment ID for reply
      // Send to server
      const callAPI = await axios.post(
        'http://localhost/learning-php-laravel-wisesocial-api/public/api/comment',
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
            "Authorization": "Bearer " + this.token
          }
        });
      this.comment = ''; // Clear the comment input field

      // TODO: Handle the API response
      let dataCmtSendToSocket = callAPI.data.data;
      this.$socket.emit(
        'ClientSendMessageToServer',
        dataCmtSendToSocket,
      );
    },

    /**
     * Sets the parent comment ID and reply target name.
     * @param {number} parentId - The ID of the comment being replied to.
     * @param {string} name - The name of the author of the comment being replied to.
     */
    replyComment(parentId, name) {
      this.parent = parentId;
      this.replyingTo = "Replying to " + name;
    },
  },
};
</script>

<style>
/**
* Custom local style css
*/
.txt-readmore:hover {
  cursor: pointer;
}

.posty {
  margin-bottom: 15px;
}
</style>
