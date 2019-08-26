<template>

    <footer class="footer fixed-bottom mt-auto py-3 bg-dark">
        <div class="w-75 mx-auto text-left">
            <span class="text-muted">
                <span>{{ new Date().getFullYear() }} — <strong>#techsense</strong></span>
                <span class="mx-3">|</span>
                <span>Please contact the TS (Tech Sense) group for more information.</span>
                <span class="mx-3">|</span>
                <b-link :href="'https://github.com/crcresearch/bvcc'" target="_blank">
                    GitHub
                </b-link>
                <span class="mx-3">|</span>
                <b-link :href="'https://crc.nd.edu'" target="_blank">
                    CRC
                </b-link>
            </span>
        </div>
    </footer>

</template>
