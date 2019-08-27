<template>

    <div class="w-100 h-100">
        <div class="w-100 h-25"></div>
        <div class="w-100">
            <b-card
                img-src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                img-alt="" img-top tag="article" style="max-width: 20rem;" class="mb-2 mx-auto">
                <b-card-title>
                    {{user.name || user.email}}
                </b-card-title>
                <b-list-group flush>
                    <b-list-group-item>
                        <strong>Email: </strong> {{user.email}}
                    </b-list-group-item>
                    <b-list-group-item>
                        <strong>Username: </strong> {{user.username}}
                    </b-list-group-item>
                </b-list-group>
            </b-card>
        </div>
    </div>

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
            
            if(!that.user.email) {
                that.showLoadingDialog('Fetching information!');
            
                that.getUser().then(response => {
                    that.setUser(response.data);
                }).catch(error => {
                    HandleErrors.HandleErrors(error);
                }).finally(() => {
                    that.hideLoadingDialog();
                });
            }
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