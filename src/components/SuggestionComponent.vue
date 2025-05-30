<template>
  <div class="suggestions full-width">
    <div class="sd-title">
      <h3>提案</h3>
    </div>
    <!--sd-title end-->
    <div class="suggestions-list">
      <div v-for="friend in suggestFriend" class="suggestion-usd">
        <img
          v-if="friend.avatar == null"
          src="../assets/images/resources/s1.png"
          alt=""
        />
        <img v-else :src="friend.avatar" alt="" />
        <div class="sgt-text">
          <h4>{{ friend.name }}</h4>
          <span>{{ friend.experience }}</span>
        </div>
        <span 
          v-on:click="!isAddingFriend[friend.id] && addFriend(friend.id)"
          :class="{ 'disabled': isAddingFriend[friend.id] }"
        >
          <i class="fa fa-plus"></i>
        </span>
      </div>
    </div>
    <!--suggestions-list end-->
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
  data() {
    /***********************************************************************************************************
     ******************************* Initialize global variables ***********************************************
     **********************************************************************************************************/
    return {
      msg: "Hello world!",
      users: [],
      token: sessionStorage.getItem("token"),
      suggestFriend: [],
      isAddingFriend: {},  // Track loading state for each friend
    };
  },
  created() {
    /***********************************************************************************************************
     *********************** Initialize data when this component is used. **************************************
     **********************************************************************************************************/
    this.listSuggestFriend();
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

    /**
     * Example default function using param
     *
     * @param int pageNum number of page
     * @return boolean
     */
    defaultFunctionUsingParam(pageNum) {
      console.log(pageNum);
      return false;
    },

    /***********************************************************************************************************
     ******* Async and await functions for manipulating server-side data through internal API protocols ********
     **********************************************************************************************************/

    async addFriend(friendId) {
      this.isAddingFriend[friendId] = true;  // Disable button
      try {
        const callAPI = await axios.get(
          "http://localhost/learning-php-laravel-wisesocial-api/public/api/add-friend",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.token,
            },
            params: {
              friend_id: friendId
            }
          }
        );
        if (callAPI.data.code == 200) {
          this.listSuggestFriend();
        } else {
          alert("Call API failed, please check again!");
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.isAddingFriend[friendId] = false;  // Re-enable button
      }
    },

    /**
     * Call API sample
     */
    async listSuggestFriend() {
      try {
        const callAPI = await axios.get(
          "http://localhost/learning-php-laravel-wisesocial-api/public/api/list-suggest-friend",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.token,
            },
          }
        );
        if (callAPI.data.code == 200) {
          this.suggestFriend = callAPI.data.data;
        } else {
          alert("Call API failed, please check again!");
        }
        console.log(callAPI.data);
      } catch (err) {
        console.log(err);
      }
    },

    async deleteUser(id) {
      try {
        const callAPI = await axios.delete(
          "http://localhost/DemoAPI/public/api/delete-user/" + id,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer 12|KpRlUny9IfRhG9h8wp3Emi7Mwv1eR1d5dt06Wavkb1be01bc",
            },
          }
        );
        this.callAPI();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
/**
* Custom local style css
*/
.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
