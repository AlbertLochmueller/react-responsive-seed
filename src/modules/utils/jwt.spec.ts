import {expect} from 'chai';
import {decode, isExpired} from "./jwt";

describe('utils.jwt', () => {

  const EXAMPLE = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsInNjb3BlcyI6WyJ1c2VyOndyaXRlIiwidXNlcjpyZWFkIl0sImlzQX' +
    'V0b0dlbmVyYXRlZCI6ZmFsc2UsInJlZ2lzdHJhdGlvbkRhdGUiOiIyMDE3LTA2LTE1VDA4OjIxOjIwLjAwMFoiLCJlbWFpbCI6InJvYmluLmJ1' +
    'c2NobWFubkBodWJqZWN0LmNvbSIsImlhdCI6MTQ5Nzg2MDk1MiwiZXhwIjoxNDk3ODYyMTUyLCJpc3MiOiJpbnRlcmNoYXJnZSJ9.cS8RWOdNl' +
    '7X4cjtRmHxrVgPcbrpu1sZTUfcCC4-gzGk',
    decodedPayload: {
      id: 51,
      scopes: [
        "user:write",
        "user:read"
      ],
      isAutoGenerated: false,
      registrationDate: "2017-06-15T08:21:20.000Z",
      email: "robin.buschmann@hubject.com",
      iat: 1497860952,
      exp: 1497862152,
      iss: "intercharge"
    },
  };

  describe('decode', () => {

    it('should not throw', () => {

      expect(() => decode(EXAMPLE.token)).not.to.throw();
    });

    it('should decode correct payload object', () => {

      const payload = decode(EXAMPLE.token);
      expect(payload).eqls(EXAMPLE.decodedPayload);
    });

  });

  describe('isExpired', () => {

    it('should not throw', () => {

      expect(() => isExpired(EXAMPLE.token)).not.to.throw();
    });

    it('should return true due to expired token', () => {

      expect(isExpired(EXAMPLE.token)).to.be.true;
    });

  });

});
