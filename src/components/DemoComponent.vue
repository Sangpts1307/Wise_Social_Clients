<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card-body">
        <h1>{{ msg }}</h1>
        <h3>Comment box: {{ txtMSG }}</h3>
        <button @click="$emit('clickMe', 'Du lieu truyen tu con sang cha.')">
          Emit data to parent component.
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
// import axios from 'axios'

// import component1 from 'component1'
// import component2 from 'component2'

// bat dau phan than cua chuong trinh vuejs
export default {
  /***********************************************************************************************************
   ******************************* Pass data to child component **********************************************
   **********************************************************************************************************/
  props: ["txtMSG"],
  // components: {component1, component2},
  data() {
    /***********************************************************************************************************
     ******************************* Initialize global variables ***********************************************
     **********************************************************************************************************/
    return {
      msg: "Toi la Thanh phan con.",
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
    
    leaveRoom() {
      this.$socket.emit("ClientSendCommentToServer", {
        transaction_id: this.transaction.id,
        // Pass param obj]
      });
    },
    // Join a room
    joinRoom() {
      this.$socket.emit("ClientSendCommentToServer", {
        // Pass param obj
        // transaction_id: this.transaction.id,
        transaction_id: 1,
      });
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
        const callAPI = await axios.get("/apiendpoint", {
          /************ Attach param for request here ***************/
        });
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
