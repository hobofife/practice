<template>
  <svg
    id="my-image"
    viewBox="0 0 595 374"
    xmlns="http://www.w3.org/2000/svg"
    width="595"
    height="374"
  >
    <svg:style>
      .title {
        font-family: 'Roboto';
        font-size: 22px;
        fill: #58abe7;
      }

      .total {
        font-family: 'Roboto';
        font-size: 22px;
        fill: #97b1c4;
      }

      .label {
        font-family: 'Roboto';
        font-size: 11px;
        font-weight: 500;
        fill: #58abe7;
      }

      .flagged-value {
        font-family: 'Roboto';
        font-size: 50px;
        fill: #e86051;
      }

      .flagged-label {
        font-family: 'Roboto';
        font-size: 11px;
        font-weight: 500;
        fill: #e86051;
      }
    </svg:style>
    <defs>
      <pattern
        id="patternBg"
        x="-11"
        y="-11"
        width="22"
        height="22"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="11" cy="11" r="7" stroke="none" fill="#0C1D37" />
      </pattern>

      <pattern
        id="patternFg"
        x="-11"
        y="-11"
        width="22"
        height="22"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="11" cy="11" r="7" stroke="none" fill="#58ABE7" />
      </pattern>

      <pattern
        id="patternHighlight"
        x="-11"
        y="-11"
        width="22"
        height="22"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="11" cy="11" r="7" stroke="none" fill="#e86051" />
      </pattern>

      <mask id="mask-path" x="0" y="0" width="595" height="374">
        <!-- <path d="M0,0  l 75,100  150,75  -25,-125  Z"  /> -->
        <circle cx="355" cy="187" r="100" fill="#fff" />
      </mask>

      <!-- TODO: will need to calculate the mask depending on how many dots to highlight -->
      <mask id="highlight-dots" x="0" y="0" width="595" height="374">
        <rect
          v-for="mask in highlightDots"
          :key="mask"
          :x="mask.x"
          :y="mask.y"
          :width="mask.width"
          :height="mask.height"
          fill="#fff"
        ></rect>
        <!-- <rect x="365" y="145" width="20" height="40" fill="#fff"></rect>
             <rect x="385" y="145" width="20" height="62" fill="#fff"></rect> -->
      </mask>
    </defs>

    <!-- started with 600 x 370 (golden ratio) -->

    <rect x="0" y="0" width="595" height="374" fill="#112748" />
    <rect x="0" y="0" width="595" height="374" fill="url(#patternBg)" />
    <rect
      x="0"
      y="0"
      width="595"
      height="374"
      fill="url(#patternFg)"
      mask="url(#mask-path)"
    />
    <rect
      x="0"
      y="0"
      width="595"
      height="374"
      mask="url(#highlight-dots)"
      fill="url(#patternHighlight)"
    />

    <text x="10" y="30" class="title">{{ query }}</text>
    <text x="10" y="30" dy="16" class="label">SEARCH QUERY</text>

    <text x="10" y="90" width="100" class="title">{{ conversationCount }}</text>
    <text x="10" y="90" :dx="numSpace(conversationCount)" class="total">
      /{{ kFormatterDecimal(conversationTotal) }}
    </text>
    <text x="10" y="90" dy="16" class="label">CONVERSATIONS</text>

    <text x="10" y="150" width="100" class="title">{{ messageCount }}</text>
    <text x="10" y="150" :dx="numSpace(messageCount)" class="total">
      /{{ kFormatterDecimal(messageTotal) }}
    </text>
    <text x="10" y="150" dy="16" class="label">MESSAGES</text>

    <text x="10" y="210" width="100" class="title">{{ sourceCount }}</text>
    <text x="10" y="210" :dx="numSpace(sourceCount)" class="total">
      /{{ kFormatterDecimal(sourceTotal) }}
    </text>
    <text x="10" y="210" dy="16" class="label">SOURCES</text>

    <text x="10" y="270" width="100" class="title">{{ authorCount }}</text>
    <text x="10" y="270" :dx="numSpace(authorCount)" class="total">
      /{{ kFormatterDecimal(authorTotal) }}
    </text>
    <text x="10" y="270" dy="16" class="label">AUTHORS</text>

    <text x="10" y="350" class="flagged-value">{{ flaggedCount }}</text>
    <text x="10" y="350" dx="35" class="flagged-label">
      CONVERSATIONS FLAGGED
    </text>
  </svg>
</template>

<script>
export default {
  name: 'search-report',
  props: {
    query: {
      type: String,
      default: 'darkrecon AND search',
    },
    conversationCount: {
      type: String,
      default: '100',
    },
    messageCount: {
      type: String,
      default: '2000',
    },
    sourceCount: {
      type: String,
      default: '30',
    },
    authorCount: {
      type: String,
      default: '400',
    },
    conversationTotal: {
      type: String,
      default: '925222',
    },
    messageTotal: {
      type: String,
      default: '323400100',
    },
    sourceTotal: {
      type: String,
      default: '429',
    },
    authorTotal: {
      type: String,
      default: '2100400',
    },
    flaggedCount: {
      type: String,
      default: '13',
    },
  },
  computed: {
    highlightDots: function () {
      function moveOnGrid(numSpaces, fromWhere) {
        return fromWhere + gridSize * numSpaces;
      }

      function getColumns(numDots) {
        const columns = [];
        const fullColumns = Math.floor(numDots / maxPerColumn);
        const remainder = numDots % maxPerColumn;
        if (remainder > 0) {
          columns.push(remainder);
        }
        for (let i = 0; i < fullColumns; i++) {
          columns.push(maxPerColumn);
        }
        return columns;
      }

      const gridOffset = 7;
      const gridSize = 22;
      const circleX = gridSize * 15 + gridOffset;
      const circleY = gridSize * 7 + gridOffset;
      const startX = moveOnGrid(-3, circleX);
      const startY = moveOnGrid(-2, circleY);
      const masks = [];
      const maxPerColumn = 6;
      const columns = getColumns(Number(this.flaggedCount));

      for (let [index, numElements] of columns.entries()) {
        let columnY = startY;
        if (numElements < maxPerColumn) {
          const blankElements = maxPerColumn - numElements;
          columnY = moveOnGrid(blankElements, startY);
        }

        const newColumn = {
          x: moveOnGrid(index, startX),
          y: columnY,
          width: gridSize,
          height: gridSize * numElements,
        };
        masks.push(newColumn);
      }
      return masks;
    },
  },

  methods: {
    numSpace(chars) {
      const charSize = 12;
      return chars.length * charSize;
    },
    kFormatterDecimal(n) {
      n = Number(n);
      if (n < 1e3) return n;
      if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
      if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
      if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
      if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
    },
  },
};
</script>
