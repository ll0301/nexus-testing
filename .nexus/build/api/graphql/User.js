"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
nexus_1.schema.objectType({
    name: 'User',
    definition(t) {
        t.string('id');
        t.string('email');
        t.string('password');
        t.boolean('isSignIn');
    },
});
nexus_1.schema.extendType({
    type: 'Query',
    definition(t) {
        t.field('signInUsers', {
            type: 'User',
            list: true,
            resolve(_root, _args, ctx) {
                return ctx.db.users.filter(p => p.isSignIn === true);
            },
        });
    },
});
nexus_1.schema.extendType({
    type: 'Mutation',
    definition(t) {
        t.field('signUpUser', {
            type: 'User',
            args: {
                email: nexus_1.schema.stringArg({ required: true }),
                password: nexus_1.schema.stringArg({ required: true }),
            },
            resolve(_root, args, ctx) {
                const cuidNum = ctx.db.users.length + 1;
                const user = {
                    id: "cuid" + cuidNum,
                    email: args.email,
                    password: args.password,
                    isSignIn: false,
                };
                ctx.db.users.push(user);
                return user;
            },
        });
    },
});
nexus_1.schema.extendType({
    type: 'Mutation',
    definition(t) {
        t.field('signInUser', {
            type: 'User',
            args: {
                email: nexus_1.schema.stringArg({ required: true }),
                password: nexus_1.schema.stringArg({ required: true }),
            },
            resolve(_root, args, ctx) {
                let getSignInUser = ctx.db.users.find(p => p.email === args.email);
                if (!getSignInUser) {
                    throw new Error('Could not find user email ' + args.email);
                }
                else {
                    if (!getSignInUser.isSignIn) {
                        if (getSignInUser.password === args.password) {
                            getSignInUser.isSignIn = true;
                        }
                        else {
                            throw new Error('Password do not match');
                        }
                    }
                    else {
                        throw new Error('Already signed up user');
                    }
                }
                return getSignInUser;
            },
        });
    },
});
nexus_1.schema.extendType({
    type: 'Mutation',
    definition(t) {
        t.field('logOutUser', {
            type: 'User',
            args: {
                email: nexus_1.schema.stringArg({ required: true }),
                password: nexus_1.schema.stringArg({ required: true }),
            },
            resolve(_root, args, ctx) {
                let getUser = ctx.db.users.find(p => p.email === args.email);
                if (!getUser) {
                    throw new Error('Could not find user email ' + args.email);
                }
                else {
                    if (getUser.isSignIn) {
                        if (getUser.password === args.password) {
                            getUser.isSignIn = false;
                        }
                        else {
                            throw new Error('Password do not match');
                        }
                    }
                    else {
                        throw new Error('Already logged out user');
                    }
                }
                return getUser;
            },
        });
    },
});
