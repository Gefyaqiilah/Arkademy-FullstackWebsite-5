<template>
  <div id="modalPIN" class="modal-pin">
    <!-- Modal content -->
    <div class="modalpin-content">
      <div class="modalpin-header">
        <p>Enter PIN to Transfer</p>
        <span class="close"><img src="/img/x.png" alt="" /></span>
      </div>
      <div class="modalpin-body">
        <p>
          Enter your 6 digits PIN for confirmation to continue transferring
          money.
        </p>
        <form action="" class="form">
          <div class="pin">
            <input
              type="text"
              min="0"
              maxlength="1"
              class="form-control pin-1"
              name=""
              id=""
              required
            />
            <input
              type="text"
              min="0"
              maxlength="1"
              class="form-control pin-2"
              name=""
              id=""
              required
            />
            <input
              type="text"
              min="0"
              maxlength="1"
              class="form-control pin-3"
              name=""
              id=""
              required
            />
            <input
              type="text"
              min="0"
              maxlength="1"
              class="form-control pin-4"
              name=""
              id=""
              required
            />
            <input
              type="text"
              min="0"
              maxlength="1"
              class="form-control pin-5"
              name=""
              id=""
              required
            />
            <input
              type="text"
              min="0"
              maxlength="1"
              class="form-control pin-6"
              name=""
              id=""
              required
            />
          </div>
          <div class="modalpin-footer">
            <button type="submit">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalPin',
  mounted () {
    this.showModalPin()
  },
  methods: {
    showModalPin () {
      // Get the modal
      const modal = document.getElementById('modalPIN')
      console.log(modal)
      // Get the button that opens the modal
      const btn = document.getElementById('show-modal-pin')
      console.log(btn)
      // Get the <span> element that closes the modal
      const span = document.getElementsByClassName('close')[0]

      // When the user clicks the button, open the modal
      btn.onclick = function () {
        console.log('masuk ke function button clik')
        modal.style.display = 'block'
      }

      // When the user clicks on <span> (x), close the modal
      span.onclick = function () {
        modal.style.display = 'none'
      }

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function (event) {
        if (event.target === modal) {
          modal.style.display = 'none'
        }
      }
    },
    clickModal () {

    }
  }
}
</script>

<style scoped>
.modal-pin {
  display: none;
  /* Hidden by default */
  position: fixed;
  /* Stay in place */
  z-index: 1;
  /* Sit on top */
  padding-top: 100px;
  /* Location of the box */
  left: 0;
  top: 0;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  /* Black w/ opacity */
}

/* Modal Content */
.modalpin-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 35px;
  border: 1px solid #888;
  width: 35%;
  height: 417px;
  border-radius: 25px;
  box-sizing: border-box;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }

  to {
    top: 0;
    opacity: 1;
  }
}

@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }

  to {
    top: 0;
    opacity: 1;
  }
}

/* The Close Button */
.close {
  color: white;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.modalpin-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* align-content: center; */
}

.modalpin-header p {
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #3a3d42;
}

.modalpin-body {
  padding: 2px 0;
}

.modalpin-body p {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  color: rgba(58, 61, 66, 0.6);
}

.form-control {
  border: 1px solid rgba(169, 169, 169, 0.6);
  overflow: hidden !important;
  border-radius: 10px !important;
  height: 65px !important;
  width: 53px !important;
  background: #ffffff;
  /* Grey/60% */

  box-sizing: border-box !important;
  box-shadow: 0px 10px 75px rgba(147, 147, 147, 0.1) !important;
}

.modalpin-footer {
  padding: 85px 0 0 0;
  /* padding: 2px 16px; */
  /* background-color: #5cb85c; */
  color: white;
}

.modalpin-footer button {
  display: block;
  margin: 0 0 0 auto;

  background: #6379f4;
  box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);
  border-radius: 12px;
  border: none;
  width: 170px;
  height: 57px;

  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: #ffffff;
}

.pin {
  display: flex;
  flex-direction: row;
  /* background-color: aquamarine; */
  justify-content: space-between;
}

.pin-1 {
  font-weight: 700;
  text-align: center;
}

.pin-2 {
  /* margin: 10px 10px; */
  font-weight: 700;
  text-align: center;
}

.pin-3 {
  /* margin: 10px; */
  font-weight: 700;
  text-align: center;
}

.pin-4 {
  /* margin: 10px; */
  font-weight: 700;
  text-align: center;
}

.pin-5 {
  /* margin: 10px; */
  font-weight: 700;
  text-align: center;
}

.pin-6 {
  /* margin: 10px; */
  font-weight: 700;
  text-align: center;
}
</style>
