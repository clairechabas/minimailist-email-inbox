<template>
  <div class="bulk-action-bar">
    <span class="checkbox">
      <input 
        type="checkbox" 
        :checked="allAreSelected"
        :class="[someAreSelected ? 'partial-check' : '']"
        @click="selectAll"
      />
    </span>
    <span class="buttons">
      <button 
        :disabled="[...emailSelection.emails].every(e => e.read)" 
        @click="emailSelection.markRead()"
      >Mark Read</button>
      <button 
        :disabled="[...emailSelection.emails].every(e => !e.read)" 
        @click="emailSelection.markUnread()"
      >Mark Unread</button>
      <button 
        :disabled="emailSelectionCount === 0" 
        @click="emailSelection.archive()"
      >Archive</button>
    </span>
  </div>
</template>

<script>
import useEmailSelection from '@/composables/use-email-selection'
import { computed } from 'vue'

export default {
  setup(props) {
    let allEmailsCount = computed(() => props.emails.length)

    let emailSelection = useEmailSelection()

    let emailSelectionCount = computed(() => emailSelection.emails.size)
    
    let allAreSelected = computed(() => {
      return emailSelectionCount.value > 0 && emailSelectionCount.value === allEmailsCount.value
    })
    let someAreSelected = computed(() => {
      return emailSelectionCount.value > 0 && !allAreSelected
    })

    let selectAll = function() {
      if (allAreSelected.value) {
        emailSelection.clear()
      } else {
        emailSelection.addMultiple(props.emails)
      }
    }

    return {
      allAreSelected,
      emailSelection,
      emailSelectionCount,
      selectAll,
      someAreSelected,
    }
  },

  props: {
    emails: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped></style>