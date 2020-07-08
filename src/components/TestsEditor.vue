<template>
  <item-container>
    <q-toolbar class="bg-grey-3">
      <q-btn flat round dense icon="check_circle">
        <q-badge floating color="primary">{{
          selectedDefinition.sourceTests.length
        }}</q-badge>
      </q-btn>
      <q-toolbar-title>
        Tests
      </q-toolbar-title>
      <q-btn flat round dense title="Run Tests" icon="play_circle_filled" @click="runTests" />
      <q-btn flat round dense title="Add Test" icon="add_circle" @click="addTest" />
    </q-toolbar>
    <div class="q-pa-md q-gutter-md">
      <q-list bordered class="rounded-borders" clickable>
        <q-expansion-item
          v-for="(test, index) in selectedDefinition.sourceTests"
          :key="index"
          group="tests"
          expand-separator
        >
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon
                name="check_circle"
                :color="
                  $store.state.definitions.failedTests &&
                  Array.isArray($store.state.definitions.failedTests) &&
                  $store.state.definitions.failedTests.find(
                    t => t.id === test.id
                  ) &&
                  $store.state.definitions.failedTests.find(
                    t => t.id === test.id
                  ).failed === true
                    ? 'negative'
                    : 'positive'
                "
              />
            </q-item-section>

            <q-item-section> Test #{{ index + 1 }} </q-item-section>

            <q-item-section side>
              <div class="row items-center">
                <q-btn
                  class="gt-xs"
                  size="12px"
                  flat
                  dense
                  round
                  title="Clone Test"
                  icon="file_copy"
                  @click="cloneTest(test)"
                />
                <q-btn
                  size="12px"
                  flat
                  dense
                  round
                  title="Remove Test"
                  icon="delete"
                  @click="removeTest(test)"
                />
              </div>
            </q-item-section>
          </template>
          <test-definition-form :test="test"></test-definition-form>
        </q-expansion-item>
      </q-list>
    </div>
  </item-container>
</template>

<script lang="js">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import marked from 'marked';

import ItemContainer from './ItemContainer.vue';
import TestDefinitionForm from './../forms/TestDefinitionForm.vue';

@Component({
  components: {
    ItemContainer,
    TestDefinitionForm
  },
  computed: {
    ...mapGetters('definitions', [
      'selectedDefinition',
      'compiledTestsMarkdown',
      'compiledFailedTestsMarkdown',
      'compiledSucceededTestsMarkdown'
    ])
  },
  methods: {
    ...mapActions('definitions', [
      'addTest',
      'cloneTest',
      'removeTest',
      'setFailedTests'
    ])
  }
})
export default class TestsEditor extends Vue {
  @Prop() definition;

  compileMarkdown(value) {
    return marked(value);
  }

  runTests() {
    window.code = this.definition.htmlSource;
    const failedTests = [];
    this.definition.sourceTests.forEach(t => {
      try {
        /*
        test strings may require jQuery and are written as the following examples.
          jquery expressions:
              assert("!$('h2').attr('style')");
          or regular expressions:
              code.match(/.container\s*?{[\s\S]*grid-template-columns\s*?:\s*?100px\s*?100px\s*?100px\s*?;[\s\S]*}/gi);
        */
        const unAsserted = t.testString.substring('assert'.length + 1).replace(');', ';');
        // console.log("@eval", unAsserted, "=", eval(unAsserted));
        const result = eval(unAsserted);
        t.failed = result === false || result === null;
        failedTests.push({...t});
      } catch (error) {
        // console.log('@error', error);
        t.failed = true;
        failedTests.push({...t});
      }
    });
    this.$store.dispatch('definitions/setFailedTests', failedTests);
  }
}
</script>

<style lang="scss" scoped>
code {
  color: red;
}
</style>
