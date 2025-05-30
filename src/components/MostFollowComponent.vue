<template>
  <div class="widget widget-about">
    <br />
    <div class="col-12 text-left">
      <h3>トップ プロフィール</h3>
    </div>
    <div class="col-12" id="list-profile">
      <div
        id="carouselExampleControls"
        class="carousel slide"
        data-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="user-profy">
              <img
                v-if="user.avatar == null"
                src="../assets/images/resources/user2.png"
                alt=""
              />
              <img v-else :src="user.avatar" width="38px" alt="" />

              <h3>{{ user.name }}</h3>
              <span>{{ user.experience }}</span>
              <a :href="'/user-profile?id=' + user.id" title=""
                >View Profile</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
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
      user: [],
      token: sessionStorage.getItem("token"),
    };
  },
  created() {
    /***********************************************************************************************************
     *********************** Initialize data when this component is used. **************************************
     **********************************************************************************************************/
    this.mostFollowed();
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

    /**
     * Call API sample
     */
    async mostFollowed() {
      try {
        const callAPI = await axios.get(
          "http://localhost/learning-php-laravel-wisesocial-api/public/api/most-followed",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.token,
            },
          }
        );
        if (callAPI.data.code == 200) {
          this.user = callAPI.data.data;
        } else {
          alert("Call API failed, please check again!");
        }
        console.log(callAPI.data);
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
</style>
