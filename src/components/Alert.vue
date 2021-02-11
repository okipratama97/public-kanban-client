<template></template>

<script>
export default {
  props: ["re_enable_alert", "alert_message"],
  created: 
    function () {
      const icon = this.alert_message.icon || "success"
      const message = this.alert_message.message
      this.$swal({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1500,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        },
        icon: icon,
        title: message,
      })

      this.$emit("alert_switch", false)
    }
  
};
</script>