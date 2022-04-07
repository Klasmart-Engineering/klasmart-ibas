module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '724a24a5ae5849b127a82b7bc8193a1c'),
  },
});
