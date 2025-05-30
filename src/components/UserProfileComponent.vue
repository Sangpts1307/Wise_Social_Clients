<template>
  <div class="user-data full-width">
    <div class="user-profile">
      <div class="username-dt">
        <div class="usr-pic">
          <img v-if="!this.users.avatar" src="../assets/images/resources/user-pic.png" alt="" />
          <img v-else :src="this.users.avatar" alt="" />
        </div>
      </div>
      <!--username-dt end-->
      <div class="user-specs">
        <h3>{{ this.users.name }}</h3>
        <span> {{ this.users.overview }}</span>
      </div>
    </div>
    <!--user-profile end-->
    <ul class="user-fw-status">
      <li>
        <!-- Following -->
        <h4>Following</h4>
        <span>{{ this.users.following }}</span>
      </li>
      <li>
        <!-- Followers -->
        <h4>Followers</h4>
        <span>{{ this.users.followers }}</span>
      </li>
      <li>
        <a :href="'/my-profile?user_id=' + this.users.id"  title="">プロフィールを表示</a>
      </li>
    </ul>
  </div>
</template>


<script>
import axios from 'axios'

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
      msg: 'Hello world!',
      users: {},
      token: sessionStorage.getItem('token'),
    }
  },
  created() {
    /***********************************************************************************************************
     *********************** Initialize data when this component is used. **************************************
     **********************************************************************************************************/
    // Get token from session storage
    // console.log("User plainTextToken is: " + this.token);
    this.callAPI();
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
      console.log("When the value of the msg variable changes, this method will be executed.");
    }
  },
  computed: {
    appendMsg() {
      return msg + "Process the value and assign the value to the corresponding variable the var has changed.";
    }
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
    async callAPI() {
      try {
        const callAPI = await axios.get('http://localhost/learning-php-laravel-wisesocial-api/public/api/my-info', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token,
          }
        });
        if (callAPI.data.code == 200) {
          this.users = callAPI.data.data;
        } else {
          alert("Call API failed, please check again!");
        }
        // console.log(callAPI.data);
        // console.log(this.users);
      } catch (err) {
        console.log(err);
      }
    },

    async deleteUser(id) {
      try {
        const callAPI = await axios.delete('http://localhost/DemoAPI/public/api/delete-user/' + id, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 12|KpRlUny9IfRhG9h8wp3Emi7Mwv1eR1d5dt06Wavkb1be01bc'
          }
        }); 
        this.callAPI();
      } catch (err) {
        console.log(err);
      }

    }
  },
}
</script>

<style>
/**
* Custom local style css
*/
</style>
