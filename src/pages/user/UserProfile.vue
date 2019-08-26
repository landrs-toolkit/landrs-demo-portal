<template>
    <v-card class="mx-auto" max-width="400" tile>
        <v-card-text justify-center>
            <v-img
                class="elevation-6"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            ></v-img>
        </v-card-text>
        <v-card-title>{{user.name || user.email}}</v-card-title>

        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title>Email</v-list-item-title>
                <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title>Username</v-list-item-title>
                <v-list-item-subtitle>{{user.username}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </v-card>
</template>

<script>
    import HandleErrors from '@/utilities/handle-errors';

    import DashboardBaseTemplate from '@/layouts/DashboardBaseTemplate.vue'

    import {
        mapActions,
        mapState
    } from 'vuex';

    export default {
        mixins: [DashboardBaseTemplate],
        computed: {
            ...mapState('user', [
                'user'
            ])
        },
        mounted: function () {
            let that = this;
            that.showLoadingDialog('Fetching information!');

            // HTTP.defaults.headers.common['Authorization'] = 'test';
            that.getUser().then(response => {
                that.setUser(response.data);
            }).catch(error => {
                HandleErrors.HandleErrors(error);
            }).finally(() => {
                that.hideLoadingDialog();
            });
        },
        methods: {
            ...mapActions('user',
                ['setUser', 'getUser']
            )
        }
    }
</script>

<style>

</style>