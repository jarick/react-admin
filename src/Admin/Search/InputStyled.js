import styled from 'styled-components'

// eslint-disable-next-line
const image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAQJJREFUKBWVkr2uQUEUhf3ET6GRaC5aFRoJKrf1BKpb8SwqovYGXkCj00k0QnRKEYkILYobvpUYmeMMyVnJl7P3mjN7Zu9zwiGv2qRFyMMSRrAFp6JPN8XzBj+wgDkUYAg7WINTYdwpDECxrRLJHeq2accdkgm8bzTvNAg2EDOGeUYI1KNO1gkuzTA1g8T7ojbn4ONQWPuHPWgeHmnzCqoe15tkSNPgPEAn68oVcOmA2XMtGK9FoE/VhOTTVNExqLCGZnxCv2pYauEC6lF0oQxX6IOvb7yX9NPEQafan+aPXDdQC18LsO6Tip5BBY6gIQaSbnMCFRCBZRcIvFkbsvCr4AFGOCxQy+JdGQAAAABJRU5ErkJggg=='
// language=SCSS prefix=dummy{ suffix=}
export const SearchInput = styled.div`
  position: relative;
  float: right;

  &::before {
    content: url(${image});
    display: block;
    position: absolute;
    width: 15px;
    z-index: 3;
    height: 15px;
    font-size: 20px;
    top: 5px;
    left: 7px;
    line-height: 32px;
    opacity: 0.6;
  }

  & > input {
    padding: 5px 10px 5px 25px;
    position: relative;
  }

  & > input:focus {
    outline: none;
  }
`;
