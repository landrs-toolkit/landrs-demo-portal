<template>
  <footer class="footer mt-auto border-top border-top-light " style="background:#f5f5f5">
    <b-container>
      <b-row class="tw-pt-10 tw-pb-8 tw-text-sm">
        <b-col>
          <h6>LANDRS</h6>
          <p class="text-gray-700">A Sloan Foundation funded project to build open source tools for managing scientific data on drones through the use of web standards and linked data technologies.</p>
        </b-col>
        <b-col>
          <h6>Links</h6>
          <ul>
            <li>
              <a class="text-gray-700" href="https://www.landrs.org/contact" target="_blank">Contact LANDRS</a>
            </li>
          </ul>
        </b-col>
      </b-row>
    </b-container>
    <div class="footer-copyright bg-white">
      <b-container class="text-center tw-text-gray-600 py-2">
        <span>
          &copy;
          {{ new Date().getFullYear() }} — University of Notre Dame
        </span>
      </b-container>
    </div>
  </footer>
</template>
