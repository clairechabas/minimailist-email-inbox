<template>
  <table class="mail-table">
    <tbody>
      <tr v-for="email in unarchivedEmails" :key="email.id" :class="['clickable', email.read ? 'read' : '']">
        <td>
          <input 
            type="checkbox"
            @click="emailSelection.toggle(email)"
            :selected="emailSelection.emails.has(email)"
          />
        </td>
        <td @click="openEmail(email)">{{ email.from }}</td>
        <td @click="openEmail(email)">
          <p><span class="subject">{{ email.subject }}</span> - {{ email.body }}</p>
        </td>
        <td class="date">{{ format(new Date(email.sentAt), 'MMM do yyyy') }}</td>
        <td><button @click="archive(email)">Archive</button></td>
      </tr>
    </tbody>
  </table>

  <Modal v-if="hasOpenedEmail" @close="closeModal">
    <MailView :email="openedEmail" @email-change="emailChange" />
  </Modal>
</template>

<script>
import MailView from '../MailView'
import Modal from '../Modal'

import { format } from 'date-fns'
import axios from 'axios'

import { ref } from 'vue'
import useEmailSelection from '@/composables/use-email-selection'

export default {
  components: {
    MailView,
    Modal,
  },

  async setup() {
    return {
      emailSelection: useEmailSelection(),
      emails: ref([]),
      format,
      openedEmail: ref(null),
    }
  },

  mounted() {
    this.getEmails()
  },

  computed: {
    hasOpenedEmail() {
      return !!this.openedEmail
    },
    sortedEmails() {
      return this.emails.sort((email1, email2) => email1.sentAt < email2.sentAt ? 1 : -1)
    },
    unarchivedEmails() {
      return this.sortedEmails.filter(email => !email.archived)
    }
  },

  methods: {
    archive(email) {
      email.archived = true
      this.updateEmail(email)
    },
    closeModal() {
      this.openedEmail = null
    },
    emailChange({ changeIndex, closeModal, save, toggleArchive, toggleRead }) {
      let email = this.openedEmail

      if (toggleArchive) email.archived = !email.archived
      if (toggleRead) email.read = !email.read
      if (save) this.updateEmail(email)
      if (closeModal) this.openedEmail = null

      if (changeIndex) {
        const newEmaiIndex = this.unarchivedEmails.indexOf(email) + changeIndex
        const newOpenedEmail = this.unarchivedEmails[newEmaiIndex]
        this.openedEmail = newOpenedEmail
      }
    },
    markAsRead(email) {
      email.read = true
      this.updateEmail(email)
    },
    openEmail(email) {
      if(email) {
        this.markAsRead(email)
      }

      this.openedEmail = email
    },
    async getEmails() {
      const { data: emails } = await axios.get('http://localhost:3000/emails')
      this.emails = emails
    },
    updateEmail(email) {
      axios.put(`http://localhost:3000/emails/${email.id}`, email)
    }
  }
}
</script>

<style lang="scss" scoped></style>