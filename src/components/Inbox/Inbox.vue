<template>
  <table class="mail-table">
    <tbody>
      <tr v-for="email in unarchivedEmails" :key="email.id" :class="['clickable', email.read ? 'read' : '']"
        @click="markAsRead(email)">
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
</template>

<script>
import { format } from 'date-fns'
import { ref } from 'vue'
import axios from 'axios'

export default {
  async setup() {
    const { data: emails } = await axios.get('http://localhost:3000/emails')

    return {
      format,
      emails: ref(emails),
    }
  },

  computed: {
    sortedEmails() {
      return this.emails.sort((email1, email2) => email1.sentAt < email2.sentAt ? 1 : -1)
    },
    unarchivedEmails() {
      return this.sortedEmails.filter(email => !email.archived)
    }
  },

  methods: {
    markAsRead(email) {
      email.read = true
      this.updateEmail(email)
    },
    archive(email) {
      email.archived = true
      this.updateEmail(email)
    },
    updateEmail(email) {
      axios.put(`http://localhost:3000/emails/${email.id}`, email)
    }
  }
}
</script>

<style lang="scss" scoped></style>