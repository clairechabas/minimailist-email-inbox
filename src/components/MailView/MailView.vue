<template>
  <div class="email-display">
    <div>
      <button @click="toggleArchive">{{ email.archived ? 'Unarchive (a)' : 'Archive (a)' }}</button>
      <button @click="toggleRead">{{ email.read ? 'Mark Unread (r)' : 'Mark Read (r)' }}</button>
      <button @click="goToNewerEmail">Newer</button>
      <button @click="goToOlderEmail">Older</button>
    </div>

    <h2 class="mb-0">Subject: <strong>{{ email.subject }}</strong></h2>
    <div><em>From {{ email.from }} on {{ format(new Date(email.sentAt), 'MMM do yyyy') }}</em></div>
    <div v-html="marked(email.body)" />
  </div>
</template>

<script>
import { format } from 'date-fns'
import { marked } from 'marked'
import axios from 'axios'

import useKeydown from '@/composables/use-keydown'

export default {
  setup(props, { emit }) {
    let toggleArchive = () => emit('email-change', { toggleArchive: true, save: true, closeModal: true })
    let toggleRead = () => emit('email-change', { toggleRead: true, save: true })
    let goToNewerEmail = () => emit('email-change', { changeIndex: -1 })
    let goToOlderEmail = () => emit('email-change', { changeIndex: +1 })
    let goToNewerEmailAndArchive = () => emit('email-change', { changeIndex: -1, toggleArchive: true, save: true })
    let goToOlderEmailAndArchive = () => emit('email-change', { changeIndex: +1, toggleArchive: true, save: true })
  
    useKeydown([
      { key: 'a', action: toggleArchive },
      { key: 'r', action: toggleRead },
      { key: 'ArrowLeft', action: goToNewerEmail },
      { key: 'ArrowRight', action: goToOlderEmail },
      { key: 'n', action: goToNewerEmailAndArchive },
      { key: 'p', action: goToOlderEmailAndArchive },
    ])

    return {
      format,
      marked,
      toggleArchive,
      toggleRead,
      goToNewerEmail,
      goToOlderEmail,
      goToNewerEmailAndArchive,
      goToOlderEmailAndArchive,
    }
  },
  props: {
    email: {
      type: Object, 
      required: true,
    }
  },
}
</script>

<style lang="scss" scoped></style>