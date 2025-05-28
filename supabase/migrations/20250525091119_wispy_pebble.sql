/*
  # Add test data for spot table

  1. Changes
    - Insert sample data into spot table for each type:
      - restaurant
      - cafe
      - attraction
      - recommendation
*/

-- Insert test data for spot table
INSERT INTO spot (place_name, type, address, description, tags)
VALUES
  (
    '태백산 맛집',
    'restaurant',
    '강원 태백시 황지동 123-45',
    '태백산 등산객들이 즐겨 찾는 맛집입니다. 산채비빔밥과 더덕구이가 유명합니다.',
    ARRAY['맛집', '한식', '산채비빔밥']
  ),
  (
    '하늘카페',
    'cafe',
    '강원 태백시 황지동 234-56',
    '태백시 전경이 한눈에 보이는 루프탑 카페입니다. 커피와 디저트가 맛있기로 유명합니다.',
    ARRAY['카페', '루프탑', '뷰맛집']
  ),
  (
    '태백산국립공원',
    'attraction',
    '강원 태백시 소도동 산1-1',
    '해발 1,567m의 태백산은 강원도의 대표적인 명산입니다. 사계절 아름다운 풍경을 자랑합니다.',
    ARRAY['관광지', '등산', '국립공원']
  ),
  (
    '삼수령',
    'recommendation',
    '강원 태백시 황지동 산1-2',
    '한강, 낙동강, 오십천의 발원지가 만나는 지점입니다. 태백의 대표적인 관광 명소입니다.',
    ARRAY['추천', '명소', '발원지']
  );