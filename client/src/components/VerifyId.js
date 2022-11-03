/** @format */

const regex = /([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})/i

export default function verify(id) {
  if (id.length === 36) {
    return regex.test(id)
  }
}
