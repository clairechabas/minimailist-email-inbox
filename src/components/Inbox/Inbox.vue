<template>
  <table class="mail-table">
    <tbody>
      <tr v-for="email in unarchivedEmails" :key="email.id" :class="['clickable', email.read ? 'read' : '']"
        @click="openEmail(email)">
        <td>
          <input type="checkbox">
        </td>
        <td>{{ email.from }}</td>
        <td>
          <p><span class="subject">{{ email.subject }}</span> - {{ email.body }}</p>
        </td>
        <td class="date">{{ format(new Date(email.sentAt), 'MMM do yyyy') }}</td>
        <td><button @click="archive(email)">Archive</button></td>
      </tr>
    </tbody>
  </table>

  <Modal v-if="hasOpenedEmail" @close="closeModal">
    <MailView :email="openedEmail" />
  </Modal>
</template>

<script>
import MailView from '../MailView'
import Modal from '../Modal'

import { format } from 'date-fns'
import axios from 'axios'

import { ref } from 'vue'

export default {
  components: {
    MailView,
    Modal,
  },

  async setup() {
    return {
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
    markAsRead(email) {
      email.read = true
      this.updateEmail(email)
    },
    openEmail(email) {
      this.markAsRead(email)

      this.openedEmail = email
    },
    async getEmails() {
      const { data: emails } = await axios.get('http://localhost:3000/emails')
      this.emails = emails
    },
    async updateEmail(email) {
      await axios.put(`http://localhost:3000/emails/${email.id}`, email)
    }
  }
}
</script>

<style lang="scss" scoped></style>