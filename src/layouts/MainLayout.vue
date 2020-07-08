/* eslint-disable @typescript-eslint/restrict-template-expressions */
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="setIsDrawerVisible(!$store.state.definitions.isDrawerVisible)"
        />

        <q-toolbar-title>
          Trainee
        </q-toolbar-title>

        <q-select
          title="Definition"
          filled
          dense
          v-model="$store.state.definitions.selectedDefinitionId"
          :options="$store.state.definitions.definitions"
          :selected-item="$store.state.definitions.selectedDefinitionId"
          option-label="name"
          option-value="id"
          emit-value
          map-options
        >
          <template v-slot:selected-item="scope">
            <span style="color: #fff;">{{ scope.opt.name.toUpperCase() }}</span>
          </template>
        </q-select>

        <q-btn-dropdown color="primary" label="Download" class="q-mx-sm" no-caps>
          <q-list separator>
            <q-item clickable v-close-popup @click="downloadMarkdown">
              <q-item-section avatar>
                <q-icon color="primary" name="cloud_download" />
              </q-item-section>
              <q-item-section>Markdown</q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="downloadJson">
              <q-item-section avatar="">
                <q-icon color="primary" name="cloud_done" />
              </q-item-section>
              <q-item-section>Json</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-select
          title="Languages"
          filled
          dense
          label-color="white"
          v-model="$store.state.definitions.selectedLanguage"
          :options="languages"
          :selected-item="$store.state.definitions.selectedLanguage"
        >
          <template v-slot:selected-item="scope">
            <span style="color: #fff;">{{ scope.opt }}</span>
          </template>
        </q-select>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="$store.state.definitions.isDrawerVisible"
      :show-if-above="$store.state.definitions.isDrawerVisible"
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Workspace
        </q-item-label>
        <SideBarMenu
          v-for="option in menuOptions"
          :key="option.title"
          v-bind="option"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang='ts'>
import { mapGetters, mapActions } from 'vuex';
import SideBarMenu from 'components/SideBarMenu.vue';
import { downloader, buildMarkdown } from './../utils';
import IMenuItem from './../types/MenuItem';

export default {
  name: 'MainLayout',

  components: {
    SideBarMenu
  },

  computed: {
    ...mapGetters('definitions', [
      'selectedDefinition',
      'selectedLanguage',
      'languages'
    ])
  },

  methods: {
    ...mapActions('definitions', ['setIsDrawerVisible']),
    downloadJson: function() {
      downloader(
        JSON.stringify(this.selectedDefinition),
        'application/json',
        `${
          this.selectedDefinition.name
        }.${this.selectedLanguage.toLowerCase()}.json`
      );
    },

    downloadMarkdown: function() {
      downloader(
        buildMarkdown(this.selectedDefinition),
        'application/markdown',
        `${
          this.selectedDefinition.name
        }.${this.selectedLanguage.toLowerCase()}.md`
      );
    }
  },

  data() {
    return {
      menuOptions: [
        {
          label: 'About',
          caption: 'trainee',
          icon: 'help_outline',
          route: 'https://github.com/migfig'
        }
      ] as IMenuItem[]
    };
  }
};
</script>
