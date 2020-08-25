"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
nexus_1.schema.objectType({
    name: 'Post',
    definition(t) {
        t.int('id');
        t.string('title');
        t.string('body');
        t.boolean('published');
    },
});
nexus_1.schema.extendType({
    type: 'Query',
    definition(t) {
        t.field('drafts', {
            type: 'Post',
            list: true,
            resolve(_root, _args, ctx) {
                return ctx.db.posts.filter(p => p.published === false);
            },
        });
    },
});
nexus_1.schema.extendType({
    type: 'Mutation',
    definition(t) {
        t.field('createDraft', {
            type: 'Post',
            args: {
                title: nexus_1.schema.stringArg({ required: true }),
                body: nexus_1.schema.stringArg({ required: true }),
            },
            resolve(_root, args, ctx) {
                const draft = {
                    id: ctx.db.posts.length + 1,
                    title: args.title,
                    body: args.body,
                    published: false,
                };
                ctx.db.posts.push(draft);
                return draft;
            },
        });
    },
});
nexus_1.schema.extendType({
    type: 'Mutation',
    definition(t) {
        t.field('publish', {
            type: 'Post',
            args: {
                draftId: nexus_1.schema.intArg({ required: true }),
            },
            resolve(_root, args, ctx) {
                let draftToPublish = ctx.db.posts.find(p => p.id === args.draftId);
                if (!draftToPublish) {
                    throw new Error('Could not find draft with id ' + args.draftId);
                }
                draftToPublish.published = true;
                return draftToPublish;
            },
        });
    },
});
