<template>
  <div class="q-pa-md">
    <q-form @submit="onFormSubmit" @reset="onFormCancel" class="q-gutter-md">
      <q-input
        filled
        type="textarea"
        v-model="test.text"
        label="Text *"
        hint="Display text"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type the text']"
      />

      <q-input
        filled
        type="textarea"
        v-model="test.testString"
        label="Test expression *"
        lazy-rules
        :rules="[
          val =>
            (val !== null && val !== '') || 'Please type the test expression'
        ]"
      />
    </q-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapGetters, mapActions } from 'vuex';
import { ITestDefinition } from './../types/Definition';

@Component({
  computed: {
    ...mapGetters('definitions', ['selectedTest'])
  },
  methods: {
    ...mapActions('definitions', ['setIsEditingTest'])
  }
})
export default class TestDefinitionForm extends Vue {
  @Prop() private onSubmit?: VoidFunction;
  @Prop() private onCancel?: VoidFunction;
  @Prop() private test!: ITestDefinition;

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
