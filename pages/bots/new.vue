<template>
  <v-row class="py-5" v-if="checkMobile() == false">
    <v-col cols="12" style="position: relative">
      <v-icon @click="$router.push('/bots')"> mdi-arrow-left </v-icon>
      <v-row>
        <v-col cols="12" class="text-center text-h5 font-weight-bold pl-3">
          {{ title }} for {{ selectedExchange }}
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-row
        no-gutters
        align="center"
        justify="center"
        style="min-height: 600px"
      >
        <v-col
          cols="1"
          style="min-width: 10%"
          class="d-flex align-center justify-end"
        >
          <!-- CUSTOM STEPPER -->
          <v-card flat rounded class="custom-stepper-container">
            <v-list dense rounded>
              <v-list-item
                :class="
                  e1 == 0
                    ? 'custom-stepper off-white-2 mb-2'
                    : 'custom-stepper mb-2'
                "
                :ripple="false"
                @click="e1 = 0"
              >
                <v-progress-circular
                  :rotate="270"
                  :size="60"
                  :width="7"
                  :value="e1 >= 0 ? 100 : 0"
                  color="primary"
                  class="d-flex align-center justify-center"
                >
                  <!-- <v-list-item-avatar size="50" class="ma-0"
                    > -->
                  <v-icon
                    size="20"
                    :color="e1 >= 0 ? 'primary' : ''"
                    v-html="`$vuetify.icon.ProfitBarChartIcon`"
                  ></v-icon>
                  <!-- </v-list-item-avatar> -->
                </v-progress-circular>
              </v-list-item>
              <v-list-item
                :class="
                  e1 == 1
                    ? 'custom-stepper off-white-2 mb-2'
                    : 'custom-stepper mb-2'
                "
                :ripple="false"
                @click="e1 = 1"
              >
                <v-progress-circular
                  :rotate="270"
                  :size="60"
                  :width="7"
                  :value="e1 >= 1 ? 100 : 0"
                  color="primary"
                  class="d-flex align-center justify-center"
                >
                  <!-- <v-list-item-avatar size="50" class="ma-0"> -->
                  <v-icon
                    size="20"
                    :color="e1 >= 1 ? 'primary' : ''"
                    v-html="`$vuetify.icon.ChartArrowUpIcon`"
                  ></v-icon>
                  <!-- </v-list-item-avatar> -->
                </v-progress-circular>
              </v-list-item>

              <v-list-item
                :class="
                  e1 == 2
                    ? 'custom-stepper off-white-2 mb-2'
                    : 'custom-stepper mb-2'
                "
                :ripple="false"
                @click="e1 = 2"
              >
                <v-progress-circular
                  :rotate="270"
                  :size="60"
                  :width="7"
                  :value="e1 >= 2 ? 100 : 0"
                  color="primary"
                  class="d-flex align-center justify-center"
                >
                  <!-- <v-list-item-avatar size="50" class="ma-0"> -->
                  <v-icon
                    size="20"
                    :color="e1 >= 2 ? 'primary' : ''"
                    v-html="`$vuetify.icon.CopyCheckIcon`"
                  ></v-icon>
                  <!-- </v-list-item-avatar> -->
                </v-progress-circular>
              </v-list-item>
              <v-list-item
                :class="
                  e1 == 3
                    ? 'custom-stepper off-white-2 mb-2'
                    : 'custom-stepper mb-2'
                "
                :ripple="false"
                @click="e1 = 3"
              >
                <v-progress-circular
                  :rotate="270"
                  :size="60"
                  :width="7"
                  :value="e1 >= 3 ? 100 : 0"
                  color="primary"
                  class="d-flex align-center justify-center"
                >
                  <!-- <v-list-item-avatar size="50" class="ma-0"> -->
                  <v-icon
                    size="20"
                    :color="e1 >= 3 ? 'primary' : ''"
                    v-html="`$vuetify.icon.DocumentTextIcon`"
                  ></v-icon>
                  <!-- </v-list-item-avatar> -->
                </v-progress-circular>
              </v-list-item>
            </v-list>
          </v-card>

          <!-- CUSTOM STEPPER ENDS -->
        </v-col>
        <v-col cols="11" style="max-width: 90% !important">
          <v-tabs-items v-model="e1" vertical style="height: 100%" class="pa-5">
            <v-tab-item key="0">
              <ModalsBotSetupStrategyAndAmount
                v-if="showStrategySetup"
                :selected-strategy="bot.strategy"
                ref="strategyRef"
                @onSelected="onStrategySelected"
              >
                <v-btn
                  width="120"
                  rounded
                  color="primary"
                  @click="_continue(2)"
                >
                  Continue
                </v-btn>
              </ModalsBotSetupStrategyAndAmount>
              <!-- <div class="d-flex float-left">
                              <v-btn class="danger white--text" @click="_deleteBot( bot.id)">
                                  Delete Bot
                              </v-btn>
                          </div> -->
            </v-tab-item>
            <v-tab-item key="1">
              <v-card flat min-height="200px">
                <ModalsBotSetupTechnicalAnalysis
                  v-if="showTechnicalAnalysis"
                  :selected-technical="bot.analysis"
                  ref="analysisRef"
                  @onAnalysisSelected="onAnalysisSelected"
                >
                  <v-row>
                    <v-col cols="12">
                      <div class="d-flex float-left my-4">
                        <v-btn
                          width="120"
                          color="primary"
                          @click="e1 = 0"
                          rounded
                          outlined
                        >
                          Back
                        </v-btn>
                      </div>
                      <div class="d-flex float-right my-4">
                        <v-btn
                          width="120"
                          rounded
                          color="primary"
                          @click="_continue(3)"
                        >
                          Continue
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </ModalsBotSetupTechnicalAnalysis>
              </v-card>
            </v-tab-item>
            <v-tab-item key="2">
              <v-card
                min-height="200px"
                flat
                class="d-flex flex-column align-start pa-5 mt-2"
              >
                <h3 class="mb-4 text-h6 font-weight-bold">Token Exceptions</h3>
                <v-row>
                  <v-col cols="12"
                    ><v-row align="center">
                      <v-col cols="4" class="d-flex align-center">
                        <v-text-field
                          v-model="searchTerm"
                          placeholder="Search tokens..."
                          class="my-2 d-flex align-center custom-input text-body-1"
                          rounded
                          @input="searchTokens"
                        >
                          <template v-slot:prepend-inner>
                            <v-icon class="mr-4">mdi-magnify</v-icon>
                          </template>
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" class="d-flex align-center">
                        <v-row style="width: 100%" justify="end">
                          <v-col cols="12" class="d-flex flex-wrap">
                            <v-chip
                              v-for="(token, i) in tokenException"
                              :key="`v-chip-${i}`"
                              class="ma-2 custom-chip"
                              color="primary"
                              close
                              small
                              text-color="white"
                              @click:close="toggleTokenException(token)"
                            >
                              {{ token }}
                            </v-chip>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row></v-col
                  >
                  <v-col cols="12">
                    <v-row class="chip-container">
                      <v-col
                        cols="2"
                        v-for="(token, i) in tokens"
                        :key="`v-chip-${i}`"
                        class="d-flex justify-center"
                      >
                        <v-chip
                          class="ma-2 custom-chip"
                          color="off-white "
                          text-color="basic-text--text"
                          small
                          @click.native="toggleTokenException(token)"
                        >
                          <v-avatar v-if="tokenException.includes(token)" left>
                            <v-icon class="customGreen2--text"
                              >mdi-checkbox-marked-circle</v-icon
                            >
                          </v-avatar>
                          {{ token }}
                        </v-chip>
                      </v-col>
                    </v-row></v-col
                  >
                  <v-col cols="12">
                    <v-row justify="center">
                      <v-col cols="8">
                        <div class="d-flex float-left my-4">
                          <v-btn
                            width="120"
                            color="primary"
                            @click="e1 = 1"
                            rounded
                            outlined
                          >
                            Back
                          </v-btn>
                        </div>
                        <div class="d-flex float-right my-4">
                          <v-btn
                            width="120"
                            rounded
                            color="primary"
                            @click="e1 = 3"
                          >
                            Continue
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>

                <v-select
                  v-if="tokens.length > 0 && false"
                  dense
                  class="mt-3 px-3"
                  v-model="tokenException"
                  :items="tokens"
                  chips
                  label="Token Exceptions"
                  multiple
                  outlined
                >
                  <template v-slot:prepend-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-text-field
                          v-model="searchTerm"
                          placeholder="Search"
                          @input="searchTokens"
                        ></v-text-field>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-select>
              </v-card>

              <!-- <div class="d-flex float-right my-4">
                  <v-btn color="blue darken-1" class="mr-2" @click="e1 = 2" text>
                    Back
                  </v-btn>
                  <v-btn color="primary" @click="e1 = 4"> Continue </v-btn>
                </div> -->
            </v-tab-item>
            <v-tab-item key="3">
              <v-card
                min-height="500px"
                flat
                class="d-flex flex-column align-start pa-5 mt-2"
              >
                <h3 class="mb-4 text-h6 font-weight-bold">Bot Setup Summary</h3>
                <v-row
                  class="mt-1"
                  style="width: 100%"
                  justify="center"
                  align="center"
                >
                  <v-col cols="10">
                    <v-row justify="start" align="center" class="ma-4">
                      <v-col
                        cols="4"
                        v-for="(item, i) in summary"
                        :key="`item-summary-${i}`"
                      >
                        <v-card flat rounded color="off-white">
                          <v-list-item>
                            <v-icon size="20" class="mr-4" color="primary">
                              {{ _determineIcon(item.title) }}
                            </v-icon>

                            <v-list-item-content>
                              <v-list-item-title class="text-body-2">
                                {{ item.title }}
                              </v-list-item-title>

                              <v-list-item-subtitle
                                class="text-body-1 font-weight-bold basic-text--text"
                              >
                                {{ item.value }}
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-card>
                      </v-col>
                    </v-row>
                    <v-data-table
                      v-if="false"
                      :headers="summaryHeaders"
                      :items="summary"
                      hide-default-header
                      hide-default-footer
                      class="elevation-1"
                    >
                    </v-data-table>
                  </v-col>
                  <v-col cols="12">
                    <v-row justify="center">
                      <v-col cols="8">
                        <div class="d-flex float-left my-4">
                          <v-btn
                            width="120"
                            color="primary"
                            @click="e1 = 2"
                            rounded
                            outlined
                          >
                            Back
                          </v-btn>
                        </div>

                        <div class="d-flex float-right my-4">
                          <v-btn
                            width="120"
                            rounded
                            color="customPink"
                            @click="_submitBotSetup(isUpdateMode)"
                            :disabled="
                              !user.subscription || user.subscription == false
                            "
                            v-if="!isUpdateMode"
                          >
                            Submit
                          </v-btn>
                          <v-btn
                            width="120"
                            rounded
                            color="customPink"
                            class="white--text"
                            @click="_submitBotSetup(isUpdateMode)"
                            :disabled="
                              !user.subscription || user.subscription == false
                            "
                            v-else
                          >
                            Update
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
          <v-stepper v-if="false" flat v-model="e1" :ripple="false">
            <v-stepper-items class="off-white-3" style="width: 100%">
              <v-stepper-content class="py-0 px-0" step="1"></v-stepper-content>

              <v-stepper-content class="py-0" step="2"></v-stepper-content>

              <v-stepper-content class="py-0" step="3"></v-stepper-content>

              <v-stepper-content class="py-0" step="4"></v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-row v-else class="pt-5">
    <v-col cols="12" style="position: relative" class="px-5">
      <v-row>
        <v-col cols="12" class="text-h5 font-weight-bold pl-3">
          <v-icon @click="$router.push('/bots')"> mdi-arrow-left </v-icon>
          {{ title }} for {{ selectedExchange }}
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" class="pb-0">
      <v-row no-gutters align="center" justify="center">
        <v-col
          cols="12"
          class="d-flex align-center justify-center"
          style="height: 100%"
        >
          <!-- CUSTOM STEPPER -->

          <v-row justify="space-around" class="px-5">
            <v-col cols="2">
              <v-btn
                :color="e1 == 0 ? 'primary' : 'off-white-2'"
                @click="e1 = 0"
                depressed
                block
                class="custom-button-tab"
              >
                <v-icon size="20" :color="e1 == 0 ? 'white' : 'primary'"
                  >$vuetify.icons.DepositIcon</v-icon
                >
              </v-btn>
            </v-col>
            <v-col cols="2">
              <v-btn
                :color="e1 == 1 ? 'primary' : 'off-white-2'"
                @click="e1 = 1"
                depressed
                block
                class="custom-button-tab"
              >
                <v-icon size="20" :color="e1 == 1 ? 'white' : 'primary'"
                  >$vuetify.icon.ProfitBarChartIcon</v-icon
                >
              </v-btn>
            </v-col>
            <v-col cols="2">
              <v-btn
                :color="e1 == 2 ? 'primary' : 'off-white-2'"
                @click="e1 = 2"
                depressed
                block
                class="custom-button-tab"
              >
                <v-icon size="20" :color="e1 == 2 ? 'white' : 'primary'"
                  >$vuetify.icon.ChartArrowUpIcon</v-icon
                >
              </v-btn>
            </v-col>
            <v-col cols="2">
              <v-btn
                :color="e1 == 3 ? 'primary' : 'off-white-2'"
                @click="e1 = 3"
                depressed
                block
                class="custom-button-tab"
              >
                <v-icon size="20" :color="e1 == 3 ? 'white' : 'primary'"
                  >$vuetify.icons.CopyCheckIcon</v-icon
                >
              </v-btn>
            </v-col>
            <v-col cols="2">
              <v-btn
                :color="e1 == 4 ? 'primary' : 'off-white-2'"
                @click="e1 = 4"
                depressed
                block
                class="custom-button-tab"
              >
                <v-icon size="20" :color="e1 == 4 ? 'white' : 'primary'"
                  >$vuetify.icons.DocumentTextIcon</v-icon
                >
              </v-btn>
            </v-col>
          </v-row>

          <!-- CUSTOM STEPPER ENDS -->
        </v-col>
        <v-col cols="12" class="mt-5">
          <v-card flat rounded class="card-tab">
            <v-tabs-items v-model="e1" style="height: 100%" class="pa-5">
              <v-tab-item key="0">
                <ModalsBotSetupAmount
                  v-if="showStrategySetup"
                  :selected-strategy="bot.strategy"
                  ref="strategyRef"
                  @onSelected="onStrategySelected"
                >
                  <v-btn
                    width="120"
                    rounded
                    color="primary"
                    @click="_continue(2)"
                  >
                    Continue
                  </v-btn>
                </ModalsBotSetupAmount>
              </v-tab-item>
              <v-tab-item key="1">
                <ModalsBotSetupStrategy
                  v-if="showStrategySetup"
                  :selected-strategy="bot.strategy"
                  ref="strategyRef"
                  @onSelected="onStrategySelected"
                >
                  <v-row>
                    <v-col cols="12">
                      <div class="d-flex float-left my-4">
                        <v-btn
                          width="120"
                          color="primary"
                          @click="e1 = 0"
                          rounded
                          outlined
                        >
                          Back
                        </v-btn>
                      </div>
                      <div class="d-flex float-right my-4">
                        <v-btn
                          width="120"
                          rounded
                          color="primary"
                          @click="_continue(3)"
                        >
                          Continue
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </ModalsBotSetupStrategy>
              </v-tab-item>
              <v-tab-item key="2">
                <v-card flat rounded style="min-height: 600px">
                  <ModalsBotSetupTechnicalAnalysis
                    v-if="showTechnicalAnalysis"
                    :selected-technical="bot.analysis"
                    ref="analysisRef"
                    :wide="true"
                    @onAnalysisSelected="onAnalysisSelected"
                  >
                    <v-row>
                      <v-col cols="12">
                        <div class="d-flex float-left my-4">
                          <v-btn
                            width="120"
                            color="primary"
                            @click="e1 = 1"
                            rounded
                            outlined
                          >
                            Back
                          </v-btn>
                        </div>
                        <div class="d-flex float-right my-4">
                          <v-btn
                            width="120"
                            rounded
                            color="primary"
                            @click="_continue(4)"
                          >
                            Continue
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </ModalsBotSetupTechnicalAnalysis>
                </v-card>
              </v-tab-item>
              <v-tab-item key="3">
                <v-card style="min-height: 600px" rounded flat class="pa-3">
                  <h3 class="mb-4 text-h6 font-weight-bold">
                    Token Exceptions
                  </h3>
                  <v-row>
                    <v-col cols="12">
                      <v-row align="center">
                        <v-col cols="12" class="d-flex align-center">
                          <v-row style="width: 100%" justify="end">
                            <v-col
                              cols="12"
                              class="d-flex flex-wrap align-center justify-center"
                            >
                              <v-chip
                                v-for="(token, i) in tokenException"
                                :key="`v-chip-${i}`"
                                class="ma-2 custom-chip"
                                color="primary"
                                close
                                small
                                text-color="white"
                                @click:close="toggleTokenException(token)"
                              >
                                {{ token }}
                              </v-chip>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12">
                          <v-btn
                            color="primary"
                            rounded
                            block
                            @click="showExceptionModal = true"
                            >Add Exceptions
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                    <BaseModalMobile
                      @close="showExceptionModal = false"
                      :parentModel="showExceptionModal"
                      :maxWidth="'450'"
                    >
                      <v-card flat rounded>
                        <v-card-title
                          class="text-h6 font-weight-bold basic--text"
                        >
                          <v-row>
                            <v-col cols="6"></v-col>
                            <v-col cols="6" class="d-flex justify-end">
                              <v-btn
                                color="basic-text--text"
                                icon
                                @click="showExceptionModal = false"
                              >
                                <v-icon>mdi-close</v-icon>
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-card-title>
                        <v-card-text>
                          <v-row class="chip-container">
                            <v-col cols="12" class="d-flex align-center">
                              <v-text-field
                                v-model="searchTerm"
                                placeholder="Search tokens..."
                                class="my-2 d-flex align-center custom-input text-body-1"
                                rounded
                                @input="searchTokens"
                              >
                                <template v-slot:prepend-inner>
                                  <v-icon class="mr-4">mdi-magnify</v-icon>
                                </template>
                              </v-text-field>
                            </v-col>
                            <v-col
                              cols="6"
                              v-for="(token, i) in tokens"
                              :key="`v-chip-${i}`"
                              class="d-flex justify-center"
                            >
                              <v-chip
                                class="ma-2 custom-chip"
                                color="off-white "
                                text-color="basic-text--text"
                                @click.native="toggleTokenException(token)"
                              >
                                <v-avatar
                                  v-if="tokenException.includes(token)"
                                  left
                                >
                                  <v-icon class="customGreen2--text"
                                    >mdi-checkbox-marked-circle</v-icon
                                  >
                                </v-avatar>
                                {{ token }}
                              </v-chip>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </BaseModalMobile>

                    <v-col cols="12">
                      <v-row justify="center" align="center">
                        <v-col cols="12">
                          <div class="d-flex float-left my-4">
                            <v-btn
                              width="120"
                              color="primary"
                              @click="e1 = 2"
                              rounded
                              outlined
                            >
                              Back
                            </v-btn>
                          </div>
                          <div class="d-flex float-right my-4">
                            <v-btn
                              width="120"
                              rounded
                              color="primary"
                              @click="e1 = 4"
                            >
                              Continue
                            </v-btn>
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>

                  <v-select
                    v-if="tokens.length > 0 && false"
                    dense
                    class="mt-3 px-3"
                    v-model="tokenException"
                    :items="tokens"
                    chips
                    label="Token Exceptions"
                    multiple
                    outlined
                  >
                    <template v-slot:prepend-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-text-field
                            v-model="searchTerm"
                            placeholder="Search"
                            @input="searchTokens"
                          ></v-text-field>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-select>
                </v-card>
              </v-tab-item>
              <v-tab-item key="4">
                <v-card
                  flat
                  class="d-flex flex-column align-start pa-3"
                  style="min-height: 600px"
                >
                  <h3 class="mb-4 text-h6 font-weight-bold">
                    Bot Setup Summary
                  </h3>
                  <v-row
                    class="mt-1"
                    style="width: 100%"
                    justify="center"
                    align="center"
                  >
                    <v-col cols="12">
                      <v-row justify="start" align="center">
                        <v-col
                          cols="12"
                          v-for="(item, i) in summary"
                          :key="`item-summary-${i}`"
                        >
                          <v-card flat rounded color="off-white">
                            <v-list-item>
                              <v-icon size="20" class="mr-4" color="primary">
                                {{ _determineIcon(item.title) }}
                              </v-icon>

                              <v-list-item-content>
                                <v-list-item-title class="text-body-2">
                                  {{ item.title }}
                                </v-list-item-title>

                                <v-list-item-subtitle
                                  class="text-body-1 font-weight-bold basic-text--text"
                                >
                                  <template v-if="i == 2 || i == 4">
                                    {{ item.value | toCurrency }}</template
                                  >
                                  <template v-else> {{ item.value }}</template>
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row justify="center">
                        <v-col cols="12">
                          <div class="d-flex float-left my-4">
                            <v-btn
                              width="120"
                              color="primary"
                              @click="e1 = 3"
                              rounded
                              outlined
                            >
                              Back
                            </v-btn>
                          </div>

                          <div class="d-flex float-right my-4">
                            <v-btn
                              width="120"
                              rounded
                              color="customPink"
                              @click="_submitBotSetup(isUpdateMode)"
                              :disabled="
                                !user.subscription || user.subscription == false
                              "
                              v-if="!isUpdateMode"
                            >
                              Submit
                            </v-btn>
                            <v-btn
                              width="120"
                              rounded
                              color="customPink"
                              class="white--text"
                              @click="_submitBotSetup(isUpdateMode)"
                              :disabled="
                                !user.subscription || user.subscription == false
                              "
                              v-else
                            >
                              Update
                            </v-btn>
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

  <script>
import { exec } from "apexcharts";
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
import VStepperIcon from "@/components/VuetifyCustomComponents/VStepperIcon.vue";
import VStepperStepIcon from "@/components/VuetifyCustomComponents/VStepperIcon.vue";
import { match } from "assert";

export default {
  components: {
    VStepperIcon: VStepperIcon,
    VStepperStepIcon: VStepperStepIcon,
  },
  layout: "account",
  data() {
    return {
      title: "Create new bots",
      // STORE PARAM
      botProp: {},
      exchange: "",

      // STATE
      isUpdateMode: false,

      tokens: [],
      shownTokens: [],
      tokensCopy: [],
      tokenException: [],
      bot: {
        selected_exchange: null,
        strategy: {
          style: {
            name: null,
          },
          usdt_to_apply: 0,
          usdt_per_order: 0,
          max_concurrent_trading_pair: 0,
        },
        analysis: {
          first_analysis: {
            analysis: null,
          },
          second_analysis: {
            analysis: null,
          },
          condition: null,
          minimum_trading_volume: null,
        },
        token_exception: null,
      },
      e1: 0,
      summaryHeaders: [
        {
          text: "Title",
          align: "start",
          value: "title",
        },
        {
          text: "Value",
          align: "start",
          value: "value",
          cellClass: "font-weight-bold",
        },
      ],
      searchTerm: "",
      summary: [
        {
          color: "indigo",
          icon: "mdi-buffer",
          title: "Exchange",
          value: null,
        },
        {
          color: "indigo",
          icon: "mdi-buffer",
          title: "Strategy",
          // value: 'Moderate'
          value: null,
        },
        {
          color: "green",
          icon: "mdi-buffer",
          title: "Total USDT",
          // value: '$2000'
          value: null,
        },
        {
          color: "indigo",
          icon: "mdi-buffer",
          title: "Technical Analysis",
          // value: 'Bollinger & RSI'
          value: null,
        },
        {
          color: "green",
          icon: "mdi-buffer",
          title: "Minimum Trading Volume",
          // value: '$10,000,000'
          value: null,
        },
      ],

      // VALIDATION
      stepsValidation: [false, false, false, false],

      // PROPS FOR COMPONENTS
      showStrategySetup: false,
      showTechnicalAnalysis: false,

      showExceptionModal: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.authUser;
    },
    selectedExchange() {
      return this.$store.state.exchange.selectedExchange;
    },
    selectedBot() {
      return this.$store.state.bot.selectedBot;
    },
  },
  head() {
    return {
      title: this.title,
    };
  },
  methods: {
    ...mapMutations("exchange", ["setSelectedExchange"]),
    // TRIGGER
    _continue(target) {
      console.log(target);
      if (target == 2) {
        let allowed = false;
        if (
          this.bot.strategy.style.name &&
          this.bot.strategy.style.name != 0 &&
          this.bot.strategy.usdt_to_apply &&
          this.bot.strategy.usdt_to_apply != 0 &&
          this.bot.strategy.usdt_per_order &&
          this.bot.strategy.usdt_per_order != 0 &&
          this.bot.strategy.max_concurrent_trading_pair
        ) {
          allowed = true;
        }
        if (allowed) {
          this.e1 = target;
        } else {
          this.$store.commit("setShowSnackbar", {
            show: true,
            message: "Please fill all requirements needed!",
            color: "customPink",
          });
        }
      } else if (target == 3) {
        let allowed = false;
        //                 first_analysis: {
        //     analysis: null
        // },
        // second_analysis: {
        //     analysis: null
        // },
        // condition: null,
        // minimum_trading_volume: null
        if (
          this.bot.analysis.first_analysis.analysis &&
          this.bot.analysis.second_analysis.analysis &&
          this.bot.analysis.condition &&
          this.bot.analysis.minimum_trading_volume
        ) {
          allowed = true;
        }
        if (allowed) {
          this.e1 = target;
        } else {
          this.$store.commit("setShowSnackbar", {
            show: true,
            message: "Please fill all requirements needed!",
            color: "customPink",
          });
        }
        console.log(this.bot.analysis);
      }

      this.e1 = target - 1;
    },
    loggerContinue() {
      console.log("loggerContinue", this.bot);
    },
    onStrategySelected(val) {
      console.log(val);
    },
    onExchangeSelected(val) {
      this.bot.selected_exchange = val;
    },
    onStrategySelected(val) {
      console.log("onStrategySelected");
      this.bot.strategy = val;
    },
    onAnalysisSelected(val) {
      console.log("onAnalysisSelected");
      this.bot.analysis = val;
    },
    logger() {
      console.log("logger");
      console.log("botProp", this.botProp);
      console.log("bot", this.bot);
      console.log("end-of logger");
      this.$refs.strategyRef.clearData();
    },
    snackbar() {
      console.log("snackbar");
      this.$store.commit("setShowSnackbar", {
        show: true,
        message: "Hello World",
        color: "success",
      });
    },
    loader() {
      setTimeout(() => {
        this.$store.commit("setIsLoading", true);
      });
    },
    closeModal() {
      this.$emit("close-modal", false);
    },
    _riskSelected(risk) {
      console.log(risk.text);
    },
    searchTokens(e) {
      console.log(e);
      console.log(this.searchTerm);
      console.log(this.tokensCopy);
      if (!this.searchTerm) {
        this.tokens = [...this.tokensCopy];
      }

      this.tokens = this.tokensCopy.filter((exchange) => {
        return (
          exchange.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
        );
      });
    },

    // ADD-ON
    resetModalState() {
      (this.bot = {
        selected_exchange: null,
        strategy: {
          style: {
            name: null,
          },
          usdt_to_apply: null,
        },
        analysis: {
          first_analysis: {
            analysis: null,
          },
          second_analysis: {
            analysis: null,
          },
          condition: null,
          minimum_trading_volume: null,
        },
        token_exception: null,
      }),
        (this.e1 = 1);
      this.tokenException = [];
      this.searchTerm = "";
      this.setSelectedExchange(null);
      console.log(this.bot);
    },

    // CONSUME API
    async _deleteBot(id) {
      this.$store.commit("setIsLoading", true);
      let res = await this.$api.$delete("/user/bot", null, {
        params: {
          id: id,
        },
      });
      setTimeout(() => {
        this.$store.commit("setShowSnackbar", {
          show: true,
          message: "Bot Successfuly Deleted!",
          color: "danger",
        });
        this.$store.commit("setIsLoading", false);
      });
    },
    async _submitBotSetup(isUpdateMode) {
      if (!this.user.subscription) {
        this.$store.commit("setShowSnackbar", {
          show: true,
          message: "You haven't subsrcibe to any plan",
          color: "customPink",
        });
        return;
      }
      let paramTemp = {
        ...this.bot,
      };

      let analysis = {};
      analysis.condition = this.bot.analysis.condition;
      analysis.minimum_trading_volume =
        this.bot.analysis.minimum_trading_volume;
      analysis.indicators = [];

      if (this.bot.analysis.first_analysis) {
        analysis.indicators.push({
          indicator: this.bot.analysis.first_analysis.analysis,
          timeperiod: this.bot.analysis.first_analysis.time,
        });
      }

      if (this.bot.analysis.second_analysis) {
        analysis.indicators.push({
          indicator: this.bot.analysis.second_analysis.analysis,
          timeperiod: this.bot.analysis.second_analysis.time,
        });
      }

      delete paramTemp.analysis;
      paramTemp.analysis = analysis;
      this.$store.commit("setIsLoading", true);

      if (isUpdateMode) {
        delete paramTemp.id;
        let query = {
          id: this.bot.id,
        };

        console.log("paramTemp", paramTemp);
        console.log("query", query);

        let res = await this.$api.$put("/user/bot", paramTemp, {
          params: query,
        });
        setTimeout(() => {
          this.$store.commit("setShowSnackbar", {
            show: true,
            message: "Bot Successfuly Updated!",
            color: "success",
          });
        });
      } else {
        // ON INSERT
        let res = await this.$api.$post("/user/bot", paramTemp);
        setTimeout(() => {
          this.$store.commit("setShowSnackbar", {
            show: true,
            message: "Successfuly Added New Bot!",
            color: "success",
          });
        });
      }

      setTimeout(() => {
        this.$emit("close-modal", false);
        this.$store.commit("setIsLoading", false);
        this.resetModalState();
      });
    },
    async _fetchTokenList() {
      console.log("fetch token");
      console.log("exchange", this.exchange);
      let paramTemp = {
        exchange: this.exchange,
      };
      let execute = await this.$api.$get("/user/available-tokens", {
        params: paramTemp,
      });
      if (!execute.success) {
        this.$store.commit("setShowSnackbar", {
          show: true,
          message: "Failed To Fetch Token List!",
          color: "customPink",
        });
      }
      this.tokens = execute.data.result;
      this.tokensCopy = this.tokens;
      console.log("tokenlist", execute.data.result);
      // this.tokensCopy = [...this.tokens];
    },
    toggleTokenException(val) {
      if (this.tokenException.includes(val)) {
        var array = this.tokenException.filter((v) => {
          return v != val;
        });

        this.tokenException = array;
      } else {
        this.tokenException.push(val);
      }
    },
    _determineIcon(text) {
      console.log("DETERMINE ICON : ", text);
      switch (text) {
        case "Exchange":
          return "$vuetify.icon.ExchangeIcon";
        case "Strategy":
          return "$vuetify.icon.ProfitBarChartIcon";
        case "Total USDT":
          return "$vuetify.icon.ProfitBarChartIcon";
        case "Technical Analysis":
          return "$vuetify.icon.ChartArrowUpIcon";
        case "Minimum Trading Volume":
          return "$vuetify.icon.ProfitBarChartIcon";

        default:
          return "$vuetify.icon.ProfitBarChartIcon";
      }
    },
  },
  async mounted() {
    // PARAM FROM STORE
    this.botProp = this.selectedBot;
    this.exchange = this.selectedExchange;

    this.bot.selected_exchange = this.exchange;
    if (this.botProp) {
      this.isUpdateMode = true;
      this.bot.id = this.botProp._id;
      this.bot.strategy = this.botProp.strategy;
      this.bot.analysis.condition = this.botProp.analysis.condition;
      this.bot.analysis.minimum_trading_volume =
        this.botProp.analysis.minimum_trading_volume;
      let index = 0;
      for (let indicator of this.botProp.analysis.indicators) {
        if (index == 0) {
          this.bot.analysis.first_analysis = {
            analysis: indicator.indicator,
            time: indicator.timeperiod,
          };
        } else if (index == 1) {
          this.bot.analysis.second_analysis = {
            analysis: indicator.indicator,
            time: indicator.timeperiod,
          };
        }
        console.log(indicator);
        index++;
      }
      this.tokenException = this.botProp.token_exception;
    }
    this._fetchTokenList();
    setTimeout(() => {
      this.showStrategySetup = true;
      this.showTechnicalAnalysis = true;
    });
  },
  watch: {
    tokenException: {
      handler(nv, ov) {
        this.bot.token_exception = nv;
      },
      deep: true,
    },
    bot: {
      handler(nv, ov) {
        this.summary[0].value = nv.selected_exchange;
        this.summary[1].value = nv.strategy.style.name;
        this.summary[2].value = "$" + nv.strategy.usdt_to_apply;
        this.summary[3].value = `${nv.analysis.first_analysis.analysis} ${
          nv.analysis.condition == "AND" ? "&" : "/"
        } ${nv.analysis.second_analysis.analysis}`;
        this.summary[4].value = nv.analysis.minimum_trading_volume;
      },
      deep: true,
    },
  },
};
</script>

  <style scoped>
.summary .v-card__title {
  padding: 0;
  font-size: 0.9rem;
  text-align: center;
  display: block;
}

.summary .v-card__text {
  display: block;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
}

.custom-chip {
  cursor: pointer;

  width: 100%;
  display: flex;
  justify-content: center;
  max-width: fit-content;
}
.custom-input {
  margin-top: 0px !important;
  padding: 0px !important;
}
.chip-container {
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
}
.custom-stepper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-left: 5px !important;
  justify-content: flex-start;
  border-radius: 25px 0% 0% 25px;
  width: 150px;
  margin-bottom: 20px !important;
}
.custom-stepper-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  padding: 50px 0px 50px 25px;
}
.custom-button-tab {
  width: 40px;
  min-height: 40px;
}

@media only screen and (max-width: 1023px) {
  .chip-container {
    width: 100%;
    max-height: unset;
    overflow-y: auto;
  }

  .card-tab {
    min-height: 600px;
  }
  .card-tab > .v-window {
    min-height: 600px;
  }
}
</style>
