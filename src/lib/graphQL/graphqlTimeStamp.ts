import { Kind, GraphQLError, GraphQLScalarType, ValueNode } from 'graphql';
import firebase from 'firebase-admin';
const { Timestamp } = firebase.firestore;

export const TimestampType = new GraphQLScalarType({
  name: 'Timestamp',

  description:
    'Personal Timestamp Scalar Type. It receives a Date object and it converts in a Firestore Timestamp',

  serialize(value) {
    let v = value;

    if (
      !(v instanceof Timestamp) &&
      typeof v !== 'object' &&
      typeof v.toDate === 'function' &&
      typeof v !== 'string' &&
      typeof v !== 'number'
    ) {
      throw new TypeError(
        `Value is not an instance of Date, Date string or number: ${JSON.stringify(
          v
        )}`
      );
    }

    if (typeof v === 'string') {
      const date = new Date();
      date.setTime(Date.parse(value));
      try {
        v = Timestamp.fromDate(date);
      } catch (e) {
        throw new TypeError(`Value is not a valid Date: ${JSON.stringify(v)}`);
      }
    } else if (typeof v === 'number') {
      v = Timestamp.fromMillis(v);
    }

    if (Number.isNaN(v.seconds)) {
      throw new TypeError(`Value is not a valid Date: ${JSON.stringify(v)}`);
    }

    return v.toDate();
  },

  parseValue(value: string) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      throw new GraphQLError(
        `Value is not a valid Date: ${JSON.stringify(value)}`
      );
    }

    return Timestamp.fromDate(date);
  },

  parseLiteral(ast: ValueNode) {
    if (ast.kind === Kind.INT) {
      return Timestamp.fromDate(new Date(parseInt(ast.value, 10)));
    } else if (ast.kind === Kind.STRING) {
      if (this.parseValue) {
        return this.parseValue(ast.value);
      }
    }

    return null;
  },
});
