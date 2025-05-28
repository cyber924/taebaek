/*
  # Add test data for Taebaek Heritage Map

  1. Test Data
    - Add sample data for dong_heritage table
    - Add sample data for places table
*/

-- Insert test data for dong_heritage
INSERT INTO dong_heritage (dong_id, dong_name, summary, origin, history)
VALUES
  (
    'hwangji',
    '황지동',
    '태백시의 중심지이자 상업의 중심지인 황지동은 태백시에서 가장 번화한 지역입니다.',
    '황지동(黃池洞)은 황지연못이 있어 붙여진 이름입니다. 황지연못은 낙동강의 발원지로 알려져 있습니다.',
    '1981년 태백시 승격 당시 황지동이 되었으며, 이후 태백시의 행정과 상업의 중심지 역할을 해오고 있습니다.'
  );

-- Insert test data for places
INSERT INTO places (place_name, type, address, description, tags)
VALUES
  (
    '황지연못',
    'attraction',
    '강원 태백시 황지동 산1-5',
    '낙동강의 발원지인 황지연못은 태백시의 대표적인 관광지입니다. 연중 수온이 10도를 유지하며, 깊이를 알 수 없을 만큼 깊다고 합니다.',
    ARRAY['관광지', '낙동강', '연못']
  );