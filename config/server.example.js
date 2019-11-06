if (typeof window !== 'undefined') {
  throw new Error('Dont require server-config on the client')
}

export default {
  server: true,
  databaseURL: '',
  firebaseAdminCredential: {
    type: '',
    project_id: '',
    private_key_id: '',
    private_key: '',
    client_email: '',
    client_id: '',
    auth_uri: '',
    token_uri: '',
    auth_provider_x509_cert_url: '',
    client_x509_cert_url: ''
  }
}
