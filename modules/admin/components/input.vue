<template>
  <div class="input-item">
    <label class="input-item__label">{{ label }}</label>
    <div v-if="validation">
      <input
        v-if="inputType === 'text'"
        :type="inputType"
        :name="inputName"
        :class="{
          'input': true,
          'is-error': validation.validated && validation.validation_error,
          'is-success': validation.validated && !validation.validation_error,
        }"
        :value="inputValue"
        @input="onInput"
        @blur="validate($event, inputName)"
      >
      <textarea
        v-else
        :type="inputType"
        :name="inputName"
        :class="{
          'input-textarea': true,
          'is-error': validation.validated && validation.validation_error,
          'is-success': validation.validated && !validation.validation_error,
        }"
        :value="inputValue"
        @input="onInput"
        @blur="validate($event, inputName)"
      />
      <span
        v-if="validation.validated && validation.validation_error"
        class="error-message"
      >{{ validation.validation_message }}</span>
    </div>
    <div
      class="input--prepend"
      v-else
    >
      <div class="input__prepend">
        /
      </div>
      <input
        type="text"
        :name="inputName"
        class="input"
        :value="inputValue"
        :disabled="true"
      >
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      inputType: {
        type: String,
        required: true
      },
      inputName: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      validation: {
        type: Object,
        required: false,
        default: null
      },
      inputValue: {
        type: String,
        required: false,
        default: null
      },
      validate: {
        type: Function,
        required: false,
        default: null
      },
      onInput: {
        type: Function,
        required: false,
        default: null
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .input {
    box-sizing: border-box;
    -webkit-appearance: none;
    border-radius: 4px;
    outline: none;
    border: 1px solid #ddd;
    line-height: 40px;
    padding: 0 15px;
    height: 40px;
    background-color: transparent;
    color: #303133;
  }

  .input, .input:focus {
    transition: border-color .3s;
  }

  .input[disabled] {
    cursor: no-drop;
    background-color: #f6f6f6;
  }

  .input-item__label {
    font-weight: 600;
    padding-bottom: 8px;
    display: block;
  }

  .input-item {
    padding-bottom: 54px;
    position: relative;
  }

  .input-textarea {
    box-sizing: border-box;
    -webkit-appearance: none;
    border-radius: 4px;
    outline: none;
    border: 1px solid #ddd;
    background-color: transparent;
    font-size: 14px;
    color: #303133;
    padding: 5px 15px;
    min-height: 100px;
    line-height: 1.5;
    resize: vertical;
  }

  .input-textarea, .input-textarea:focus {
    transition: border-color .3s;
  }

  .is-error {
    border: 1px solid indianred;
  }

  .is-success {
    border: 1px solid green;
  }

  .error-message {
    position: absolute;
    bottom: 28px;
    left: 0;
    color: indianred;
  }

  .input--prepend {
    display: inline-table;
    border-collapse: separate;
    width: 100%;

    .input {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
    }
  }

  .input__prepend {
    display: table-cell;
    color: #7a7d82;
    padding: 0 15px;
    background-color: #f6f6f6;
    position: relative;
    width: 1px;
    white-space: nowrap;
    border: 1px solid #ddd;
    border-right: none;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  .input-item__textarea {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
