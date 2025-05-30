<template>
  <!-- <div class="row">
    <h1>Login and register</h1>
  </div> -->

  <div class="wrapper">
    <div class="sign-in-page">
      <div class="signin-popup">
        <div class="signin-pop">
          <div class="row">
            <div class="col-lg-6">
              <div class="cmp-info">
                <div class="cm-logo">
                  <img src="/src/assets/images/cm-logo.png" alt="" />
                </div>
                <!--cm-logo end-->
                <img src="/src/assets/images/cm-main-img.png" alt="" />
              </div>
              <!--cmp-info end-->
            </div>
            <div class="col-lg-6">
              <div class="login-sec">
                <ul class="sign-control">
                  <li
                    data-tab="tab-1"
                    v-on:click="chooseType('login')"
                    :class="{ current: choseType == 'login' }"
                  >
                    <!-- if click on login, then add class current -->
                    <a href="#" title="">Sign In</a>
                  </li>
                  <li
                    data-tab="tab-2"
                    v-on:click="chooseType('register')"
                    :class="{ current: choseType == 'register' }"
                  >
                    <!-- if click on register, then add class current -->
                    <a href="#" title="">Sign Up</a>
                  </li>
                </ul>
                <div
                  class="sign_in_sec"
                  id="tab-1"
                  :class="{ current: choseType == 'login' }"
                >
                  <h3>Sign In</h3>
                  <div class="form">
                    <div class="row">
                      <div class="col-lg-12 no-pdd">
                        <div class="sn-field">
                          <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            v-model="loginEmail"
                          />
                          <span class="text-danger msgError">{{
                            loginErrEmailMsg
                          }}</span>
                          <i class="fa fa-envelope"></i>
                        </div>
                        <!--sn-field end-->
                      </div>
                      <div class="col-lg-12 no-pdd">
                        <div class="sn-field">
                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            v-model="loginPassword"
                          />
                          <i class="fa fa-lock"></i>
                          <span class="text-danger msgError">{{
                            loginErrPasswordMsg
                          }}</span>
                        </div>
                      </div>
                      <div class="col-lg-12 no-pdd">
                        <button
                          type="submit"
                          value="submit"
                          v-on:click="login()"
                        >
                          Sign In
                        </button>
                      </div>
                    </div>
                  </div>
                  <!--login-resources end-->
                </div>
                <!--sign_in_sec end-->
                <div
                  class="sign_in_sec"
                  id="tab-2"
                  :class="{ current: choseType == 'register' }"
                >
                  <h3>Sign Up</h3>
                  <!--signup-tab end-->
                  <div class="dff-tab current" id="tab-3">
                    <div class="form">
                      <div class="row">
                        <div class="col-lg-12 no-pdd">
                          <div class="sn-field">
                            <input
                              type="email"
                              name="email"
                              placeholder="Email"
                              v-model="registerEmail"
                            />
                            <i class="fa fa-envelope"></i>
                            <span class="text-danger msgError">{{
                              registerErrorEmailMsg
                            }}</span>
                          </div>
                        </div>
                        <div class="col-lg-12 no-pdd">
                          <div class="sn-field">
                            <input
                              type="text"
                              name="name"
                              placeholder="Full Name"
                              v-model="registerFullName"
                            />
                            <i class="fa fa-user"></i>
                            <span class="text-danger msgError">{{
                              registerErrorFullNameMsg
                            }}</span>
                          </div>
                        </div>
                        <div class="col-lg-12 no-pdd">
                          <div class="sn-field">
                            <input
                              type="text"
                              name="country"
                              placeholder="Country"
                              v-model="registerCountry"
                            />
                            <i class="fa fa-globe"></i>
                            <span class="text-danger msgError">{{
                              registerErrorCountryMsg
                            }}</span>
                          </div>
                        </div>
                        <div class="col-lg-12 no-pdd">
                          <div class="sn-field">
                            <input
                              type="password"
                              name="password"
                              placeholder="Password"
                              v-model="registerPassword"
                            />
                            <i class="fa fa-lock"></i>
                            <span class="text-danger msgError">{{
                              registerErrorPasswordMsg
                            }}</span>
                          </div>
                        </div>
                        <div class="col-lg-12 no-pdd">
                          <div class="sn-field">
                            <input
                              type="password"
                              name="repeat-password"
                              placeholder="Repeat Password"
                              v-model="registerRePassword"
                            />
                            <i class="fa fa-lock"></i>
                            <span class="text-danger msgError">{{
                              registerErrorRePasswordMsg
                            }}</span>
                          </div>
                        </div>
                        <div class="col-lg-12 no-pdd">
                          <div class="checky-sec st2">
                            <div class="fgt-sec">
                              <input
                                type="checkbox"
                                onclick="registerCheckAllow()"
                                :checked="this.registerToS === true"
                                name="cc"
                                id="c2"
                                v-model="registerToS"
                              />
                              <label for="c2">
                                <span></span>
                              </label>
                              <small>
                                I understand and accept Wise Social's Term of
                                Service.</small
                              >
                            </div>
                            <!--fgt-sec end-->
                          </div>
                        </div>
                        <div class="col-lg-12 no-pdd row">
                          <button
                            :class="{
                              'cursor-not-allowed': this.registerToS == false,
                            }"
                            :disabled="this.registerToS === false"
                            v-on:click="registerValidation()"
                          >
                            Sign Up
                          </button>
                          <img
                            class="btn-register"
                            :class="{
                              'display-none': this.registerProcessing === false,
                            }"
                            width="40px"
                            height="40px"
                            src="/src/assets/loading.gif"
                            alt=""
                            srcset=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--login-sec end-->
            </div>
          </div>
        </div>
        <!--signin-pop end-->
      </div>
    </div>
    <!--sign-in-page end-->
  </div>
</template>

<script>
// import Vue from 'vue'
import axios from "axios";

import { requestPermission } from "../firebase"; // Import firebase settings

// import component1 from 'component1'
// import component2 from 'component2'

// bat dau phan than cua chuong trinh vuejs
export default {
  /***********************************************************************************************************
   ******************************* Pass data to child component **********************************************
   **********************************************************************************************************/
  // props: ["txtMSG"],
  // components: {component1, component2},
  data() {
    /***********************************************************************************************************
     ******************************* Initialize global variables ***********************************************
     **********************************************************************************************************/
    return {
      choseType: "login", // default to login screen

      // default register variables
      registerEmail: "",
      registerPassword: "",
      registerRePassword: "",
      registerFullName: "",
      registerCountry: "",
      registerToS: false,
      registerProcessing: false,

      // login
      loginEmail: "",
      loginPassword: "",
      loginToS: false,
      loginErrEmailMsg: "",
      loginErrPasswordMsg: "",
      loginProcessing: false,
      token: null,

      // error messages
      registerErrorEmailMsg: "",
      registerErrorPasswordMsg: "",
      registerErrorRePasswordMsg: "",
      registerErrorFullNameMsg: "",
      registerErrorCountryMsg: "",
      // registerErrorToSMsg: 'You must accept Term of Service.',
    };
  },
  /**
   * Define global service socket
   *
   * Listing event from socket.io server
   * "ServerSendCommentToClient" is the name of the channel that sends notifications to all clients installed in the server socket
   */
  sockets: {
    // Send data to server
    ClientSendCommentToServer: function (responseComment) {
      this.comment = responseComment;
    },
    // Listen event from server and render data
    ServerSendCommentToClient: function (responseComment) {
      // Push to the comment list
      if (
        responseComment.type === "comment" &&
        this.transaction.id == responseComment.transaction_id
      ) {
        this.pushCommentToList(responseComment);
        this.$forceUpdate();
      }
    },
  },
  created() {
    /***********************************************************************************************************
     *********************** Initialize data when this component is used. **************************************
     **********************************************************************************************************/
    console.log(
      "Init created component and call to function get data from api server."
    );
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
    token() {
      alert(this.token);
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

    // leaveRoom() {
    //   this.$socket.emit("ClientSendCommentToServer", {
    //     transaction_id: this.transaction.id,
    //     // Pass param obj]
    //   });
    // },
    // // Join a room
    // joinRoom() {
    //   this.$socket.emit("ClientSendCommentToServer", {
    //     // Pass param obj
    //     // transaction_id: this.transaction.id,
    //     transaction_id: 1,
    //   });
    // },

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

    /**
     * Validate function for form
     * Show msg error if form is invalid
     * Enable submit button
     * Call to register function then send data to server
     */
    registerValidation() {
      // validate email
      if (this.registerEmail == "") {
        this.registerErrorEmailMsg = "Use a correct email.";
      } else {
        this.registerErrorEmailMsg = "";
      }
      // validate full name
      if (this.registerFullName == "") {
        this.registerErrorFullNameMsg = "Use a correct full name.";
      } else {
        this.registerErrorFullNameMsg = "";
      }
      // validate country
      if (this.registerCountry.length < 4) {
        this.registerErrorCountryMsg = "Use a correct country.";
      } else {
        this.registerErrorCountryMsg = "";
      }
      // validate password
      if (this.registerPassword == "") {
        this.registerErrorPasswordMsg = "Use a correct password.";
      } else if (this.registerPassword.length < 8) {
        this.registerErrorPasswordMsg = "Minimum 8 characters required.";
      } else {
        this.registerErrorPasswordMsg = "";
      }
      // validate re-password
      if (this.registerRePassword != this.registerPassword) {
        this.registerErrorRePasswordMsg = "Password not match.";
      } else {
        this.registerErrorRePasswordMsg = "";
      }

      // call to register function
      if (
        this.registerErrorEmailMsg == "" &&
        this.registerErrorPasswordMsg == "" &&
        this.registerErrorRePasswordMsg == "" &&
        this.registerErrorFullNameMsg == "" &&
        this.registerErrorCountryMsg == ""
      ) {
        this.register();
      }
      return null;
    },

    registerCheckAllow() {
      if (this.registerToS === true) {
        this.registerToS = false;
      } else if (this.registerToS === false) {
        this.registerToS = true;
      }
    },

    login() {
      if (this.loginEmail.length <= 0) {
        this.loginErrEmailMsg = "Email is required.";
      } else {
        this.loginErrEmailMsg = "";
      }

      if (this.loginPassword.length < 8) {
        this.loginErrPasswordMsg = "Password is required.";
      } else {
        this.loginErrPasswordMsg = "";
      }

      if (this.loginErrEmailMsg == "" && this.loginErrPasswordMsg == "") {
        // Call to login function
        this.processLogin();
      }
    },

    /**
     * Default function to choose login or register
     *
     * @param type string "login" or "register"
     */
    chooseType(type) {
      this.choseType = type;
    },

    /***********************************************************************************************************
     ******* Async and await functions for manipulating server-side data through internal API protocols ********
     **********************************************************************************************************/

    /**
     * Call API sample
     */
    async callAPI() {
      try {
        const callAPI = await axios.get("/apiendpoint", {
          /************ Attach param for request here ***************/
        });
        console.log(callAPI.data);
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * Async/await for register function
     *
     * Call to /register endpoint
     * Method: POST pass param
     * Redirect route /auth
     */
    async register() {
      // Disable register button while processing
      this.registerCheckAllow();
      this.registerProcessing = true;

      try {
        const callRegisterAPI = await axios
          .post("http://localhost/learning-php-laravel-wisesocial-api/public/api/register", {
            // Pass param to header
            name: this.registerFullName,
            email: this.registerEmail,
            password: this.registerPassword,
            re_password: this.registerRePassword,
          })
          .then(function (res) {
            // Api response success
            if (res.data.code == 200) {
              window.location.reload();
            } else {
              alert(res.data.message);
            }
          })
          .catch(function (err) {
            // API response error code
            alert(err);
          });
      } catch (err) {
        // Call to api failed
        console.log(err);
      }
      // Re-enable register button
      this.registerCheckAllow();
      this.registerProcessing = false;
    },

    /**
     * Async/await for login function
     *
     * Call to /login endpoint
     * Method: POST pass param
     * Redirect route /index
     */
    async processLogin() {
      // Disable register button while processing
      this.loginProcessing = true;

      try {
        const callLoginAPI = await axios
          .post("http://localhost/learning-php-laravel-wisesocial-api/public/api/login", {
            // Pass param to header
            email: this.loginEmail,
            password: this.loginPassword,
          })
          .then(function (res) {
            // Api response success
            if (res.data.code == 200) {
              // Save token to session storage
              sessionStorage.setItem("token", res.data.data.plainTextToken);

              // Request notification permission when the app starts.
              requestPermission()
                .then((fcmToken) => {
                  // Using axios call to server add token to DB
                  axios
                    .get(
                      "http://localhost/learning-php-laravel-wisesocial-api/public/api/setDeviceToken",
                      {
                        headers: {
                          "Content-Type": "application/json",
                          Authorization:
                            "Bearer " + res.data.data.plainTextToken,
                        },
                        params: {
                          // Pass param to header
                          fcmToken: fcmToken,
                        },
                      }
                    )
                    .then(function () {
                      window.location.href = "/index";
                    });
                })
                .catch((err) => {
                  console.error("Get token error: ", err);
                });
            } else {
              alert(res.data.message);
            }
          })
          .catch(function (err) {
            // API response error code
            alert(err);
          });
      } catch (err) {
        // Call to api failed
        console.log(err);
      }
      // Re-enable button
      this.registerProcessing = false;
    },
  },
};
</script>

<style>
/**
* Custom local style css
*/
.msgError {
  font-size: 10px !important;
  right: 5px !important;
}
.cursor-not-allowed {
  cursor: not-allowed !important;
}
</style>
