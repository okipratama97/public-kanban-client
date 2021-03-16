<template></template>

<script>
export default {
  props: ['alertMessage'],
  created: function() {
    const icon = this.alertMessage.icon || 'success'
    const message = this.alertMessage.message
    this.$swal({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 1500,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', this.$swal.stopTimer)
        toast.addEventListener('mouseleave', this.$swal.resumeTimer)
      },
      icon: icon,
      title: message,
    })

    this.$emit('alertSwitch', false)
  },
}
</script>
