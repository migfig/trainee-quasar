<template>
  <div class="q-pa-md">
    <q-form
      id="formDefinition"
      @submit="onFormSubmit"
      @reset="onFormCancel"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="definition.name"
        label="Name *"
        hint="Definition name"
        lazy-rules
        :rules="[
          val => (val && val.length > 0) || 'Please type the definition name'
        ]"
      />

      <q-input
        filled
        v-model="definition.category"
        label="Category *"
        lazy-rules
        :rules="[
          val =>
            (val !== null && val !== '') ||
            'Please type the definition category'
        ]"
      />

      <q-input
        filled
        v-model="definition.videoUrl"
        label="Video url"
        lazy-rules
        :rules="[]"
      />

      <q-input
        filled
        v-model="definition.challengeType"
        label="Challenge type"
        type="number"
        lazy-rules
        :rules="[
          val =>
            (val !== null && val >= 0) || 'Please type set the challenge type'
        ]"
      />

      <q-input
        filled
        v-model="definition.forumTopicId"
        label="Forum topic id"
        type="number"
        lazy-rules
        :rules="[
          val =>
            (val !== null && val >= 0) || 'Please type set the forum topic id'
        ]"
      />

      <q-checkbox
        v-model="definition.isHidden"
        label="Hiden"
        size="sm"
      />
    </q-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapGetters, mapActions } from 'vuex';
import IDefinition from '../types/Definition';

@Component({
  computed: {
    ...mapGetters('definitions', ['selectedDefinition'])
  },
  methods: {
    ...mapActions('definitions', ['setIsEditing'])
  }
})
export default class DefinitionForm extends Vue {
  @Prop() private onSubmit?: VoidFunction;
  @Prop() private onCancel?: VoidFunction;
  @Prop() private definition!: IDefinition;

  onFormSubmit(evt: Event) {
    evt.preventDefault();
    if (this.onSubmit) this.onSubmit();
  }

  onFormCancel(evt: Event) {
    evt.preventDefault();
    if (this.onCancel) this.onCancel();
  }
}
</script>

<style scoped lang="scss">
#formDefinition {
  padding: 8px;
}
</style>
