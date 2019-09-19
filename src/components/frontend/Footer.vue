<template>
  <footer class="footer mt-auto bg-gray-300">
    <b-container>
      <b-row class="mt-5 tw-pt-10 tw-pb-8 tw-text-sm">
        <b-col>
          <h6>BVCC</h6>
          <p class="text-gray-700">This research program is about something. It is supported by organization under grant #. Please contact the TS (Tech Sense) group for more information.</p>
        </b-col>
        <b-col>
          <h6>Links</h6>
          <ul>
            <li>
              <a class="text-gray-700" href>About BVCC</a>
            </li>
            <li>
              <a class="text-gray-700" href>Contact BVCC</a>
            </li>
            <li>
              <a class="text-gray-700" href>Sign in to Data Portal</a>
            </li>
          </ul>
        </b-col>
      </b-row>
    </b-container>
    <div class="footer-copyright bg-gray-700">
      <b-container class="text-center text-gray-400 py-2">
        <span>
          &copy;
          {{ new Date().getFullYear() }} —
          #techsense
        </span>
        <span class="mx-3">|</span>
        <b-link class="text-gray-400" :href="'https://github.com/crcresearch/bvcc'" target="_blank">GitHub</b-link>
        <span class="mx-3">|</span>
        <b-link class="text-gray-400" :href="'https://crc.nd.edu'" target="_blank">CRC</b-link>
      </b-container>
    </div>
  </footer>
</template>
